import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { Link, useLocation } from 'react-router-dom';
import OrdersItem from '../orders-item/orders-item';

import styles from './orders-list.module.css';
import { object } from 'prop-types';

function OrdersList({ data, onClick }) {

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
            data.orders.map(item => {
              return (
                <li key={item.number} className={styles.block}>
                  <Link className={styles.link} to={`/feed/${item._id}`} state={{ background: location }}>
                    <OrdersItem key={uuidv4()} order={item} onClick={handleClick} />
                  </Link>
                </li>
              )
            }
            )}
        </ul>) : (
          <ul className={styles.blocksLarge} >
            {
              data.orders.map(item => {
                return (
                  <li key={item.number} className={styles.block}>
                    <Link className={styles.link} to={`/profile/orders/${item._id}`} state={{ background: location }}>
                      <OrdersItem key={uuidv4()} order={item} onClick={handleClick} />
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

OrdersList.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}

export default OrdersList;
