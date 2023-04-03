import { FC } from 'react';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../services/hooks/hooks';
import { useMemo } from 'react';
import styles from './order-view.module.css';

import { TIngredient, TOrder } from '../../services/types/data';

interface IOrderViewProps {
  order: TOrder;
}

const OrderView: FC<IOrderViewProps> = ({ order }) => {

  const { ingredients } = useSelector(store => ({
    ingredients: store.ingredients.ingredientsList
  }));

  const ingredientsInOrder = useMemo(() => {
    const arr: TIngredient[] = [];
    ingredients.filter(item => {
      return order.ingredients.map(arg => {
        if (arg === item._id) return arr.push(item);
      });
    });
    return arr;
  }, [ingredients, order.ingredients]);

  const setIngredients = [...new Set(ingredientsInOrder)];

  const price = ingredientsInOrder.reduce((acc, el) => acc + el.price, 0);

  const offset = new Date().getTimezoneOffset() / 60;
  const GMT = " i-GTM" + (offset > 0 ? "-" + offset : "+" + -offset);

  return (
    <>
      <p className={`${styles.number} text text_type_digits-default`}>#{order.number}</p>
      <h2 className={`${styles.name} text text_type_main-medium`}>{order.name}</h2>

      {order.status === "created" && (<p className={`${styles.status} text text_type_main-default`}>Создан</p>)}
      {order.status === "pending" && (<p className={`${styles.status} text text_type_main-default`}>Выполняется</p>)}
      {order.status === "done" && (<p className={`${styles.status} text text_type_main-default`}>Выполнен</p>)}

      <p className={`${styles.content} text text_type_main-medium`}>Состав:</p>

      <div className={styles.ingredients}>
        <ul className={styles.list}>
          {
            setIngredients.map(item => {
              const itemFromAllOrder = ingredientsInOrder.filter(el => el._id === item._id);
              return (
                <li key={item._id} className={styles.item}>
                  <div className={styles.imageContainer}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className={styles.image}
                    />
                  </div>
                  <div className={styles.wrapper}>
                    <p className={`${styles.nameIngredient} text text_type_main-small`}>{item.name}</p>
                    <div className={`${styles.price}`}>
                      <p className={`${styles.amount} text text_type_digits-default`}>{itemFromAllOrder.length} x {item.price}</p>
                      <CurrencyIcon type="primary" />
                    </div>
                  </div>
                </li>)
            })}
        </ul>
      </div>
      <div className={styles.footer}>
        <p className='text text_type_main-default text_color_inactive'>
          <FormattedDate date={new Date(order.createdAt)} />{GMT}</p>
        <div className={styles.price}>
          <p className={`${styles.amount} text text_type_digits-default`}>{price}</p>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </>
  )
}

export default OrderView;
