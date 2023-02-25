import PropTypes from 'prop-types';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import styles from './orders-item.module.css';

function OrdersItem({ order, onClick }) {

  const { ingredients } = useSelector(store => ({
    ingredients: store.ingredients.ingredientsList
  }));

  const location = useLocation();
  const isProfile = location.pathname.startsWith('/profile');

  const ingredientsInOrder = useMemo(() => {
    const arr = [];
    ingredients.forEach(item => {
      if (order.ingredients.find(arg => arg === item._id))
        arr.push(item);
    });
    return arr;
  }, [ingredients, order.ingredients]);

  const price = ingredientsInOrder.reduce((acc, el) => acc + el.price, 0);

  const offset = new Date().getTimezoneOffset() / 60;
  const gmt = " i-GTM" + (offset > 0 ? "-" + offset : "+" + -offset);

  const handleClick = () => {
    onClick();
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.heading}>
        <p className='text text_type_digits-default'>#{order.number}</p>
        <p className='text text_type_main-default text_color_inactive'>
          <FormattedDate date={new Date(order.createdAt)} />{gmt}</p>
      </div>
      <div className={styles.orderInfo}>
        <h2 className={`${styles.name} text text_type_main-medium`}>{order.name}</h2>
      </div>

      {isProfile && order.status === "created" && (<p className={`${styles.status} text text_type_main-default`}>Создан</p>)}
      {isProfile && order.status === "pending" && (<p className={`${styles.status} text text_type_main-default`}>Выполняется</p>)}
      {isProfile && order.status === "done" && (<p className={`${styles.status} text text_type_main-default`}>Выполнен</p>)}

      <div className={styles.container}>
        <ul className={styles.listImages}>
          {ingredientsInOrder.slice(0, 5).map(item => {
            return (
              <li key={item._id} className={styles.itemList}>
                <img src={item.image} alt={item.name} className={styles.image} />
              </li>
            )
          })}
          {
            (ingredientsInOrder.length > 5) && (
              <li key={ingredientsInOrder[5]._id} className={styles.itemList}>
                <div className={styles.round}></div>
                <img src={ingredientsInOrder[5].image} alt={ingredientsInOrder[5].name} className={styles.imageCounter} />
                <p className={`${styles.counter} text text_type_main-default`}>
                  {`+${ingredientsInOrder.length - 5}`}
                </p>
              </li>
            )
          }
        </ul>
        <div className={styles.price}>
          <p className={`${styles.amount} text text_type_digits-default`}>{price}</p>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </div>
  )
}

OrdersItem.propTypes = {
  order: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}

export default OrdersItem;
