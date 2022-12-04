import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/types.js';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-item.module.css';

function IngredientItem(props) {

  const { onClick, item } = props;

  return (
    <article className={styles.article} onClick={() => onClick(item)}>
      <Counter count={7} size="default" />
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
