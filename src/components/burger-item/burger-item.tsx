import { useRef, useCallback, FC } from 'react';
import { useDispatch, useSelector } from '../../services/hooks/hooks';
import { useDrop, useDrag, DropTargetMonitor, XYCoord } from 'react-dnd';
import { DEL_INGREDIENT_FROM_BURGER, SORT_INGREDIENTS_IN_BURGER } from '../../services/actions/burger';
import { DEC_COUNTER } from '../../services/actions/ingredients';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-item.module.css';
import { TIngredientInBurger } from '../../services/types/data';

interface IBurgerItemProps {
  index: number;
}

interface IDraggingItem {
  uniqueId: string;
  number: number;
}

const BurgerItem: FC<IBurgerItemProps> = ({ index }) => {

  const dispatch = useDispatch();
  const { ingredientsInBurger } = useSelector(store => ({
    ingredientsInBurger: store.burger.items
  }));

  const item = ingredientsInBurger[index];
  const number = index;
  const { uniqueId } = item;
  const ref = useRef<HTMLLIElement>(null);

  const [{ opacity }, refDrag] = useDrag({
    type: 'burgeritem',
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    }),
    item: () => {
      return { uniqueId, number }
    }
  });

  const replaceItems = useCallback((dragNum: number, dropNum: number) => {
    const newBurgerOrder = [...ingredientsInBurger];
    const dragItem = ingredientsInBurger[dragNum];
    newBurgerOrder[dragNum] = newBurgerOrder[dropNum];
    newBurgerOrder[dropNum] = dragItem;
    dispatch({
      type: SORT_INGREDIENTS_IN_BURGER,
      data: newBurgerOrder
    })
  }, [ingredientsInBurger]);

  const [, refDrop] = useDrop({
    accept: 'burgeritem',
    collect: monitor => ({
      handlerId: monitor.getHandlerId()
    }),
    hover: (item: IDraggingItem, monitor: DropTargetMonitor) => {
      const dragNumber = item.number;
      const dropNumber = number;

      if (dragNumber === dropNumber) return;

      const dropRect = ref.current?.getBoundingClientRect() || {bottom: 0, top: 0};
      const offset = monitor.getClientOffset();
      const dropShift = (offset as XYCoord).y - dropRect.top;

      if ((dragNumber > dropNumber && (offset as XYCoord).y < dropShift) || (dragNumber < dropNumber && (offset as XYCoord).y < dropShift)) return;
      replaceItems(dragNumber, dropNumber);
      item.number = number;
    }
  });

  refDrag(refDrop(ref));

  const handleDelete = (item: TIngredientInBurger) => {
    dispatch({
      type: DEL_INGREDIENT_FROM_BURGER,
      id: item.uniqueId
    })
    dispatch({
      type: DEC_COUNTER,
      id: item._id
    })
  }

  return (
    <li className={`${styles.item} mb-4 pr-2`} key={item.uniqueId} ref={ref} style={{ opacity }}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image_mobile}
        handleClose={() => handleDelete(item)}
      />
    </li>
  )
}

export default BurgerItem;
