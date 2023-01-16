import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Modal from '../modal/modal.js';
import styles from './ingredient-details.module.css';

function IngredientDetails({ isOpened, toClose }) {

  const { item } = useSelector(store => ({
    item: store.ingredient
  }));

  return (
    <>
      <h2 className={`text text_type_main-large ${styles.heading} ml-10 mr-10 mt-10`}>Детали ингредиента</h2>
      <article className={styles.detailes}>
        <img className={styles.image} src={item.image_large} alt={item.name}></img>
        <h3 className={`text text_type_main-medium ${styles.name} mt-4 mb-8`}>{item.name}</h3>
        <ul className={`text text_type_main-default text_color_inactive ${styles.container} mb-15`}>
          <li className={styles.column}>
            <p className={styles.title}>Калории, ккал</p>
            <p className="text text_type_digits-default mt-2">{item.calories}</p>
          </li>
          <li className={styles.column}>
            <p className={styles.title}>Белки, г</p>
            <p className="text text_type_digits-default mt-2">{item.proteins}</p>
          </li>
          <li className={styles.column}>
            <p className={styles.title}>Жиры, г</p>
            <p className="text text_type_digits-default mt-2">{item.fat}</p>
          </li>
          <li className={styles.column}>
            <p className={styles.title}>Углеводы, г</p>
            <p className="text text_type_digits-default mt-2">{item.carbohydrates}</p>
          </li>
        </ul>
      </article>
    </>
  )
}

IngredientDetails.propTypes = {
  toClose: PropTypes.func.isRequired,
  isOpened: PropTypes.bool.isRequired
}


export default IngredientDetails;
