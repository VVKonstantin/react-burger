import AppHeader from '../app-header/app-header.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.js';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';
import styles from './app.module.css';

function App() {
  return (
    <div className={styles.container}>
      <AppHeader />
      <main className={styles.main}>
        <h1 className={`${styles.main__header} text text_type_main-large mt-10 mb-5`}>Соберите бургер</h1>
        <div className={styles.main__container}>
          <BurgerIngredients />
          <BurgerConstructor />
        </div>
      </main>
    </div>
  );
}

export default App;
