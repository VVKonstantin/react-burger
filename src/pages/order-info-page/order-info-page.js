import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import OrderView from '../../components/order-view/order-view';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START, WS_CONNECTION_START_AUTH_USER } from '../../services/actions/socket';
import { getCookie } from '../../utils/cookie';
import styles from './order-info-page.module.css';

function OrderInfoPage({ type }) {

  const checkUser = getCookie('accessToken');
  const dispatch = useDispatch();
  const location = useLocation();

  const { id } = useParams();

  useEffect(() => {
    (location.pathname.startsWith("/profile") && checkUser)
      ? dispatch({ type: WS_CONNECTION_START_AUTH_USER })
      : dispatch({ type: WS_CONNECTION_START, payload: '/all' });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch, checkUser, location]);

  const { data, isGot } = useSelector(store => ({
    data: store.wsData.orders,
    isGot: store.wsData.isGot
  }));

  let order = {};
  if (isGot) order = data.orders.find(item => item._id === id);

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
