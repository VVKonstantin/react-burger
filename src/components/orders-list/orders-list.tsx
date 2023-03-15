import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TOrder } from '../../services/types/data';
import OrdersItem from '../orders-item/orders-item';

import styles from './orders-list.module.css';

interface IOrdersListProps {
  orders: Array<TOrder> | null;
  onClick: (arg: boolean) => void;
}

const OrdersList: FC<IOrdersListProps> = ({ orders, onClick }) => {

  const handleClick = () => {
    onClick(true);
  }

  const location = useLocation();
  const isProfile = location.pathname.startsWith('/profile');

  return (
    <div className={styles.orders} >
      {!isProfile ?
        (<ul className={styles.blocks} >
          {
            orders?.map(item => {
              return (
                <li key={item._id} className={styles.block}>
                  <Link className={styles.link} to={`/feed/${item._id}`} state={{ locationFeed: location }}>
                    <OrdersItem order={item} onClick={handleClick} />
                  </Link>
                </li>
              )
            }
            )}
        </ul>) : (
          <ul className={styles.blocksLarge} >
            {
              orders?.map(item => {
                return (
                  <li key={item._id} className={styles.block}>
                    <Link className={styles.link} to={`/profile/orders/${item._id}`} state={{ locationProfile: location }}>
                      <OrdersItem order={item} onClick={handleClick} />
                    </Link>
                  </li>
                )
              }
              )}
          </ul>
        )}
    </div >
  )
}

export default OrdersList;
