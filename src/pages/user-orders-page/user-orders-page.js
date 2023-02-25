import PropTypes from 'prop-types';
import {
  WS_CONNECTION_START_AUTH_USER,
  WS_CONNECTION_CLOSED
} from '../../services/actions/socket.jsx'

import OrdersList from '../../components/orders-list/orders-list';
import styles from './user-orders-page.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';


function UserOrdersPage({ toClick }) {

  const dispatch = useDispatch();

  const { data, isGot } = useSelector(store => ({
    data: store.wsData.orders,
    isGot: store.wsData.isGot
  }));

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START_AUTH_USER })
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED })
    }
  }, [dispatch]);

  return (
    isGot ?
      <>
        <div className={styles.main__container}>
          <OrdersList data={data} onClick={toClick} />
        </div>
      </> : <></>
  )
}

UserOrdersPage.propTypes = {
  toClick: PropTypes.func.isRequired
}

export default UserOrdersPage;
