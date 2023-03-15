import PropTypes from 'prop-types';
import { FC } from 'react';
import styles from './orders-statistics.module.css';

import { TOrders } from '../../services/types/data';

const OrdersStatistics: FC<TOrders> = ({ orders, total, totalToday }) => {

  const undoneOrders = orders?.filter(item => item.status !== 'done');
  const doneOrders = orders?.filter(item => item.status === 'done');

  return (
    <section className={styles.container}>
      <div className={styles.stats}>
        <div className={`${styles.doneList}`}>
          <h2 className={`${styles.subheader} text text_type_main-medium`}>Готовы:</h2>
          <ul className={styles.numbersList}>

            {doneOrders?.slice(0, 10).map(item => {
              return (
                <li key={item._id}
                  className={`${styles.listItem} text text_type_digits-default`}>
                  {item.number}
                </li>
              )
            }
            )}
          </ul>
        </div>
        <div className={styles.currentList}>
          <h2 className={`${styles.subheader} text text_type_main-medium`}>В работе:</h2>
          <ul className={styles.numbersList}>
            {undoneOrders?.slice(0, 10).map(item => {
              return (
                <li key={item._id}
                  className={`${styles.listItemW} text text_type_digits-default`}>
                  {item.number}
                </li>
              )
            }
            )}
          </ul>
        </div>
      </div>
      <div className={styles.doneAll}>
        <h2 className={`${styles.subheader} text text_type_main-medium`}>Выполнено за все время:</h2>
        <p className={`${styles.number}  text text_type_digits-large`}>{total}</p>
      </div>
      <div className={styles.doneToday}>
        <h2 className={`${styles.subheader} text text_type_main-medium`}>Выполнено за сегодня:</h2>
        <p className={`${styles.number} text text_type_digits-large`}>{totalToday}</p>
      </div>
    </section>
  )
}

export default OrdersStatistics;
