import PropTypes from 'prop-types';
import {
  WS_CONNECTION_START_AUTH_USER,
  WS_CONNECTION_CLOSED
} from '../../services/actions/socket.jsx'

import OrdersList from '../../components/orders-list/orders-list';
import styles from './user-orders-page.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { getProfileUser } from '../../services/actions/auth.jsx';
import { getCookie } from '../../utils/cookie.js';


function UserOrdersPage({ toClick }) {

  const dispatch = useDispatch();

  const { data, isGot, wsError } = useSelector(store => ({
    data: store.wsData.ordersAuth,
    isGot: store.wsData.isGot,
    wsError: store.wsData.wsError
  }));

  const { user } = useSelector(store => ({
    user: store.auth.user
  }));

  useEffect(() => {
    const token = getCookie('accessToken');
    if(user) dispatch({ type: WS_CONNECTION_START_AUTH_USER, payload: `?token=${token}` });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, []);

  useEffect(() => {
    const token = getCookie('accessToken');
    if (wsError) {
      dispatch({ type: WS_CONNECTION_CLOSED });
      dispatch(getProfileUser())
        .then(() => dispatch({ type: WS_CONNECTION_START_AUTH_USER, payload: `?token=${token}` }))
        .catch(() => dispatch({ type: WS_CONNECTION_CLOSED }));
    }
  }, [wsError]);

  return (
    data ?
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
