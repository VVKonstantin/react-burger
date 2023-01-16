import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ADD_INGREDIENT_TO_BURGER, ADD_BUN_TO_BURGER, CLEAR_BURGER } from '../../services/actions/burger.jsx';
import { INC_COUNTER, SET_BUN_COUNTER, CLEAR_COUNTERS } from '../../services/actions/ingredients.jsx';
import { CLEAR_ORDER } from '../../services/actions/order.jsx';
import { createUniqueId } from '../../utils/funcs.js';
import { setOrder } from '../../services/actions/order.jsx';
import OrderDetails from "../order-details/order-detailes.js";
import BurgerItem from '../burger-item/burger-item.js';
import styles from './burger-constructor.module.css';

function BurgerConstructor() {

  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [disabled, setDisabled] = React.useState(true);

  const [openedOrderModal, setOrderModalOpened] = React.useState(false);
  const handleCloseOrderModal = () => {
    setOrderModalOpened(false);
    setDisabled(true);
    dispatch({
      type: CLEAR_BURGER
    })
    dispatch({
      type: CLEAR_COUNTERS
    })
  };

  const handleClickOrder = () => {
    const ingredientIds = [];
    ingredientIds.push(bun[0]._id);
    ingredientsInBurger.map(elem => ingredientIds.push(elem._id));
    dispatch({
      type: CLEAR_ORDER
    })
    dispatch(setOrder(ingredientIds));
    setOrderModalOpened(true);
  };

  const { data, ingredientsInBurger, bun } = useSelector(store => ({
    data: store.ingredients.ingredientsList,
    ingredientsInBurger: store.burger.items,
    bun: store.burger.bun
  }));

  const [{ isHover }, dropRef] = useDrop({
    accept: 'items',
    drop(elem) {
      const item = createUniqueId(data.filter((el) => el._id === elem._id)[0]);
      if (item.type !== 'bun') {
        dispatch({
          type: ADD_INGREDIENT_TO_BURGER,
          item: item
        });
        dispatch({
          type: INC_COUNTER,
          id: item._id
        });
      }
      else {
        setDisabled(false);
        dispatch({
          type: ADD_BUN_TO_BURGER,
          item: item
        });
        dispatch({
          type: SET_BUN_COUNTER,
          id: item._id
        });
      }
    },
    collect: monitor => ({
      isHover: monitor.isOver()
    })
  });

  const borderColor = isHover ? '#8585AD' : 'transparent';

  const calcTotalPrice = React.useCallback(() => {
    const price = ingredientsInBurger.reduce((acc, item) => acc += item.price, 0) + 2 * bun.reduce((acc, item) => acc += item.price, 0);
    setTotalPrice(price);
  }, [ingredientsInBurger, bun]);

  React.useEffect(() => {
    calcTotalPrice();
  }, [calcTotalPrice]);

  return (
    <section className={styles.burger}>
      <ul className={`${styles.list} ml-4`} ref={dropRef} style={{ borderColor }}>
        <li className={`${styles.item} mb-4 pr-4`}>
          {(bun.length > 0) &&
            <ConstructorElement
              key={bun[0]._id}
              type="top"
              isLocked={true}
              text={`${bun[0].name} (верх)`}
              price={bun[0].price}
              thumbnail={bun[0].image}
            />
          }
        </li>
        <li className={`${styles.item}`}>
          <ul className={`${styles.list} ${styles.sublist}`}>
            {bun.length === 0 && ingredientsInBurger.length === 0 && <li className={`${styles.start}`}>Добавьте в эту область ингрединеты для бургера</li>}
            {ingredientsInBurger.map((item, index) =>
              <BurgerItem key={item.uniqueId} index={index} />
            )}
          </ul>
        </li>
        <li className={`${styles.item} mb-10 mt-4 pr-4`}>
          {(bun.length > 0) &&
            <ConstructorElement
              key={bun[0]._id}
              type="bottom"
              isLocked={true}
              text={`${bun[0].name} (низ)`}
              price={bun[0].price}
              thumbnail={bun[0].image}
            />
          }
        </li>
      </ul>
      <div className={`${styles.container} mr-4`}>
        <div className={`${styles.wrapper} mr-10`}>
          <p className='text text_type_digits-medium mr-2'>{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={() => handleClickOrder()} disabled={disabled}>Оформить заказ</Button>
      </div>
      <OrderDetails isOpened={openedOrderModal} toClose={handleCloseOrderModal} />
    </section>
  )
}

export default BurgerConstructor;
