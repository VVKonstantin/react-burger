import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED
} from '../../services/actions/socket'

import OrdersList from '../../components/orders-list/orders-list';
import OrdersStatistics from '../../components/orders-statistics/orders-statistics';
import styles from './feed-page.module.css';
import { useDispatch, useSelector } from '../../services/hooks/hooks';
import { useEffect, FC } from 'react';

interface IFeedPageProps {
  toClick: (arg: boolean) => void;
}

const FeedPage: FC<IFeedPageProps> = ({ toClick }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: '/all' })
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED })
    }
  }, [dispatch]);

  const { data } = useSelector(store => ({
    data: store.wsData.orders
  }));

  return (
    (data) &&
    <>
      <h1 className={`text text_type_main-large ${styles.header} mt-10 mb-5`}>Лента заказов</h1>
      <div className={styles.main__container}>
        <OrdersList orders={data?.orders} onClick={toClick} />
        <OrdersStatistics orders={data?.orders} total={data?.total} totalToday={data?.totalToday} />
      </div>
    </>
  )
}

export default FeedPage;
