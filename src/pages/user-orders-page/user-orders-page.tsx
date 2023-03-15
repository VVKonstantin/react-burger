import {
  WS_CONNECTION_START_AUTH_USER,
  WS_CONNECTION_CLOSED
} from '../../services/actions/socket'

import OrdersList from '../../components/orders-list/orders-list';
import styles from './user-orders-page.module.css';
import { useDispatch, useSelector } from '../../services/hooks/hooks';
import { FC } from 'react';
import { useEffect } from 'react';

import { getProfileUser } from '../../services/actions/auth';
import { getCookie } from '../../utils/cookie';

interface IUserOrdersPageProps {
  toClick: (arg: boolean) => void;
}

const UserOrdersPage: FC<IUserOrdersPageProps> = ({ toClick }) => {

  const dispatch = useDispatch();

  const { data, wsError } = useSelector(store => ({
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
          <OrdersList orders={data.orders} onClick={toClick} />
        </div>
      </> : <></>
  )
}

export default UserOrdersPage;
