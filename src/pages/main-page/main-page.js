import PropTypes from 'prop-types';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor.js';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients.js';
import styles from './main-page.module.css';

function MainPage({ toClick }) {

  return (
    <>
      <h1 className={`text text_type_main-large ${styles.header} mt-10 mb-5`}>Соберите бургер</h1>
      <div className={styles.main__container}>
        <BurgerIngredients toClick={toClick} />
        <BurgerConstructor />
      </div>
    </>
  )
}

MainPage.propTypes = {
  toClick: PropTypes.func.isRequired
}

export default MainPage;
