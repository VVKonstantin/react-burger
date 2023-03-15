import { FC } from 'react';
import { useDispatch } from '../../services/hooks/hooks';
import { useDrag } from 'react-dnd';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-item.module.css';
import { TIngredient } from '../../services/types/data.js';

interface IIngredItemProps {
  item: TIngredient;
  onClick: () => void;
}

const IngredientItem: FC<IIngredItemProps> = ({ onClick, item }) => {

  const { _id } = item;
  const dispatch = useDispatch();

  const handleClick = () => {
    onClick();
  }

  const [{ opacity }, dragRef] = useDrag({
    type: "items",
    item: { _id },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  return (
    <article className={styles.article} onClick={handleClick} ref={dragRef} style={{ opacity }}>
      {item.counter > 0 && <Counter count={item.counter} size="default" />}
      <img src={item.image} alt={item.name} className={`ml-4 mr-4`}></img>
      <div className={`${styles.container} mt-2 mb-2`}>
        <p className={`text text_type_digits-default mr-2`}>{item.price}</p><CurrencyIcon type="primary" />
      </div>
      <h3 className={`${styles.heading} text text_type_main-default`}>{item.name}</h3>
    </article>
  )
}

export default IngredientItem;
