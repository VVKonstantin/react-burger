import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-item.module.css';
import { ingredientType } from '../../utils/types.js';

function IngredientItem(props) {
  return (
    <article className={styles.article}>
      <Counter count={2} size="default" />
      <img src={props.item.image} alt={props.item.name} className={`ml-4 mr-4`}></img>
      <div className={`${styles.article__container} mt-1 mb-1`}>
        <p className={`${styles.article__price} text text_type_digits-default mr-2`}>{props.item.price}</p><CurrencyIcon type="primary" />
      </div>
      <h3 className={`${styles.article__heading} text text_type_main-default`}>{props.item.name}</h3>
    </article>
  )
}

IngredientItem.propTypes = {
  item: ingredientType.isRequired
}

export default IngredientItem;
