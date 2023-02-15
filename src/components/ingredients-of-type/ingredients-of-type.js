import PropTypes from 'prop-types';
import IngredientItem from "../ingredient-item/ingredient-item";
import { ingredientType } from "../../utils/types.js";
import styles from './ingredients-of-type.module.css';
import { Link, useLocation } from 'react-router-dom';

function IngredientsOfType(props) {
  const location = useLocation();

  const { heading, items, onClick } = props;

  return (
    <section className={`mb-10`}>
      <h2 className={`text text_type_main-medium mb-6`}>{heading}</h2>
      <ul className={`${styles.list} ml-4 mr-4`}>
        {items.map((item) => (
          <li key={item._id}>
            <Link className={`${styles.link}`} to={`/ingredients/${item._id}`} state={{background: location}}>
              <IngredientItem item={item} onClick={onClick} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

IngredientsOfType.propTypes = {
  heading: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(ingredientType).isRequired,
  onClick: PropTypes.func.isRequired
}

export default IngredientsOfType;
