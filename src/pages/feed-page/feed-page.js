import PropTypes from 'prop-types';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED
} from '../../services/actions/socket.jsx'

import OrdersList from '../../components/orders-list/orders-list';
import OrdersStatistics from '../../components/orders-statistics/orders-statistics';
import styles from './feed-page.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function FeedPage({ toClick }) {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: '/all' })
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED })
    }
  }, [dispatch]);

  const { data, isGot } = useSelector(store => ({
    data: store.wsData.orders,
    isGot: store.wsData.isGot
  }));

  return (
    isGot && data &&
    <>
      <h1 className={`text text_type_main-large ${styles.header} mt-10 mb-5`}>Лента заказов</h1>
      <div className={styles.main__container}>
        <OrdersList data={data} onClick={toClick} />
        <OrdersStatistics data={data} />
      </div>
    </>
  )
}

FeedPage.propTypes = {
  toClick: PropTypes.func.isRequired
}

export default FeedPage;
