import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AppHeader from '../app-header/app-header.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.js';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';
import { getIngredients } from '../../services/actions/ingredients.jsx';
import styles from './app.module.css';

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main className={styles.main}>
          <h1 className={`text text_type_main-large ${styles.header} mt-10 mb-5`}>Соберите бургер</h1>
          <div className={styles.main__container}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      </DndProvider>
    </div>
  )
}

export default App;
