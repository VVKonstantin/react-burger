import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import { ingredientType } from '../../utils/types.js';
import { SET_INGREDIENT_INFO } from '../../services/actions/ingredient.jsx';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-item.module.css';

function IngredientItem(props) {

  const { onClick, item } = props;
  const { _id } = item;
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch({
      type: SET_INGREDIENT_INFO,
      item: item
    });
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

IngredientItem.propTypes = {
  item: ingredientType.isRequired,
  onClick: PropTypes.func.isRequired
}

export default IngredientItem;
