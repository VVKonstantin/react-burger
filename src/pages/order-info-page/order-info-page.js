import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import OrderView from '../../components/order-view/order-view';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START, WS_CONNECTION_START_AUTH_USER } from '../../services/actions/socket';
import { getCookie } from '../../utils/cookie';

import styles from './order-info-page.module.css';

function OrderInfoPage({ type }) {

  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { id } = useParams();
  const { user } = useSelector(store => ({
    user: store.auth.user
  }));

  useEffect(() => {
    const token = getCookie('accessToken');
    user
      ? dispatch({ type: WS_CONNECTION_START_AUTH_USER, payload: `?token=${token}` })
      : dispatch({ type: WS_CONNECTION_START, payload: '/all' });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch, user]);

  const { data, dataAuth, isGot } = useSelector(store => ({
    data: store.wsData.orders,
    dataAuth: store.wsData.ordersAuth,
    isGot: store.wsData.isGot,
    wsError: store.wsData.wsError
  }));

  let order = null;

  if (dataAuth && pathname.startsWith('/profile')) order = dataAuth.orders.find(item => item._id === id);
  if (data && !pathname.startsWith('/profile'))  order = data.orders.find(item => item._id === id);

  return (
    isGot && order &&
    (<section className={type !== 'modal' ? styles.container : styles.modal}>
      <OrderView order={order} />
    </section>)
  )
}

OrderInfoPage.propTypes = {
  type: PropTypes.string
}

export default OrderInfoPage;
