import IngredientItem from "../ingredient-item/ingredient-item";
import styles from './ingredients-of-type.module.css';
import { Link, useLocation } from 'react-router-dom';
import { FC } from 'react';
import { TIngredient } from '../../services/types/data';

interface IIngredOfTypeProps {
  heading: string;
  items: Array<TIngredient>;
  onClick: () => void;
}

const IngredientsOfType: FC<IIngredOfTypeProps> = (props) => {
  const location = useLocation();

  const { heading, items, onClick } = props;

  return (
    <section className={`mb-10`}>
      <h2 className={`text text_type_main-medium mb-6`}>{heading}</h2>
      <ul className={`${styles.list} ml-4 mr-4`}>
        {items.map((item) => (
          <li key={item._id}>
            <Link className={`${styles.link}`} to={`/ingredients/${item._id}`} state={{locationIng: location}}>
              <IngredientItem item={item} onClick={onClick} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default IngredientsOfType;
