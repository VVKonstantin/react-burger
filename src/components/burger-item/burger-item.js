import PropTypes from 'prop-types';
import { useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop, useDrag } from 'react-dnd';
import { DEL_INGREDIENT_FROM_BURGER, SORT_INGREDIENTS_IN_BURGER } from '../../services/actions/burger.jsx';
import { DEC_COUNTER } from '../../services/actions/ingredients.jsx';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-item.module.css';

function BurgerItem({ index }) {

  const dispatch = useDispatch();
  const { ingredientsInBurger } = useSelector(store => ({
    ingredientsInBurger: store.burger.items
  }));

  const item = ingredientsInBurger[index];
  const number = index;
  const { uniqueId } = item;
  const ref = useRef(null);

  const [{ opacity }, refDrag] = useDrag({
    type: 'burgeritem',
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    }),
    item: () => {
      return { uniqueId, number }
    }
  });

  const replaceItems = useCallback((dragNum, dropNum) => {
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
    hover: (item, monitor) => {
      const dragNumber = item.number;
      const dropNumber = number;

      if (dragNumber === dropNumber) return;

      const dropRect = ref.current.getBoundingClientRect();
      const offset = monitor.getClientOffset();
      const dropShift = offset.y - dropRect.top;

      if ((dragNumber > dropNumber && offset > dropShift) || (dragNumber < dropNumber && offset < dropShift)) return;
      replaceItems(dragNumber, dropNumber);
      item.number = number;
    }
  });

  refDrag(refDrop(ref));

  const handleDelete = (item) => {
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

BurgerItem.propTypes = {
  index: PropTypes.number.isRequired
}

export default BurgerItem;
