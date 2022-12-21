import React from 'react';
import { getData, setOrder } from '../../utils/api.js';
import AppHeader from '../app-header/app-header.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.js';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';
import IngredientDetails from "../ingredient-details/ingredient-details.js";
import { IngredientsContext } from '../../services/contexts.js';
import Modal from '../modal/modal.js';
import OrderDetails from "../order-details/order-detailes.js";
import styles from './app.module.css';

function App() {

  const [ingredients, setIngredients] = React.useState([]);
  const [openedModal, setModalOpened] = React.useState(false);
  const [clickedItem, setClickedItem] = React.useState(null);
  const [numberOrder, setNumberOrder] = React.useState(159);

  const handleClickIngredient = (item) => {
    setClickedItem(item);
    setModalOpened(true)
  };

  const handleClickOrder = (data) => {
    setOrder(data)
      .then(res => setNumberOrder(res.order.number))
      .then(() => {
        setClickedItem(null);
        setModalOpened(true)
      })
      .catch(e => console.log(e))
  };

  const handleCloseModal = () => {
    setModalOpened(false)
  };

  const getIngredients = () => {
    getData()
      .then(res => setIngredients(res.data))
      .catch(e => console.log(e))
  };

  React.useEffect(() => {
    getIngredients()
  }, []);

  return (
    <div className={styles.container}>
      <IngredientsContext.Provider value={ingredients}>
          <AppHeader />
          <main className={styles.main}>
            <h1 className={`text text_type_main-large ${styles.header} mt-10 mb-5`}>Соберите бургер</h1>
            <div className={styles.main__container}>
              <BurgerIngredients onClick={handleClickIngredient} />
              <BurgerConstructor onClick={handleClickOrder} />
            </div>
          </main>
          <Modal isOpened={openedModal} toClose={handleCloseModal}>
            {clickedItem ? <IngredientDetails item={clickedItem} /> : <OrderDetails numberOrder={numberOrder} />}
          </Modal>
      </IngredientsContext.Provider>

    </div>
  )
}

export default App;
