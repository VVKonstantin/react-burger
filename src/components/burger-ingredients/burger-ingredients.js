import { data } from '../../utils/data';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsOfType from '../ingredients-of-type/ingredients-of-type';
import styles from './burger-ingredients.module.css'

function BurgerIngredients() {

  const buns = data.filter(item => item.type === 'bun');
  const mains = data.filter(item => item.type === 'main');
  const sauces = data.filter(item => item.type === 'sauce');

  return (
    <section className={styles.ingredients}>
      <div className={styles.ingredients__types}>
        <Tab value="Булки" active='one'>Булки</Tab>
        <Tab value="Соусы" active=''>Соусы</Tab>
        <Tab value="Начинки" active=''>Начинки</Tab>
      </div>
      <div className={`${styles.ingredients__blocks} mt-10`}>
        <IngredientsOfType heading='Булки' items={buns} />
        <IngredientsOfType heading='Соусы' items={sauces} />
        <IngredientsOfType heading='Начинки' items={mains} />
      </div>
    </section>
  )
}

export default BurgerIngredients;
