import React from 'react';
import { getData } from '../../utils/api.js';
import AppHeader from '../app-header/app-header.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.js';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';
import Modal from '../modal/modal.js'
import styles from './app.module.css';

function App() {

  const [ingredients, setIngredients] = React.useState([]);
  const [openedModal, setModalOpened] = React.useState(false);
  const [clickedItem, setClickedItem] = React.useState(null);
  const [numberOrder, setNumberOrder] = React.useState(159);

  const handleClickIngredient = (item) => {
    setClickedItem(item);
    setModalOpened(true)
  }

  const handleCloseModal = () => {
    setModalOpened(false)
  }

  const handleNumberOrder = () => {
    setClickedItem(null);
    setNumberOrder(numberOrder + 4);
    setModalOpened(true)
  }

  const getIngredients = () => {
    getData()
      .then(res => setIngredients(res.data))
      .catch(e => console.log(e))
  }

  React.useEffect(() => {
    getIngredients()
  }, []);

  return (
    <div className={styles.container}>
      <AppHeader />
      <main className={styles.main}>
        <h1 className={`text text_type_main-large ${styles.header} mt-10 mb-5`}>Соберите бургер</h1>
        <div className={styles.main__container}>
          <BurgerIngredients data={ingredients} onClick={handleClickIngredient} />
          <BurgerConstructor onClick={handleNumberOrder} />
        </div>
      </main>
      <Modal isOpened={openedModal} toClose={handleCloseModal} item={clickedItem} numberOrder={numberOrder} />
    </div>
  )
}

export default App;
