import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import iconDone from '../../images/icon_done.svg';
import Modal from '../modal/modal.js';
import styles from './order-detailes.module.css';

function OrderDetails({ isOpened, toClose }) {

  const { numberOrder, orderRequest } = useSelector(store => ({
    numberOrder: store.order.orderNumber,
    orderRequest: store.order.orderRequest
  }));

  const content = useMemo(() => {
    return orderRequest ? (<h2 className={`text ${styles.glow} mt-30`}>секундочку...</h2>) : (
      <h2 className={`text text_type_digits-large ${styles.glow} mt-30`}>{numberOrder}</h2>
    )
  }, [orderRequest, numberOrder, isOpened, toClose]);

  return (
    <Modal isOpened={isOpened} toClose={toClose}>
      <div className={styles.container}>
        {content}
        <p className={`text text_type_main-medium mt-8 mb-15`}>идентификатор заказа</p>
        <img className={styles.image} src={iconDone} alt='Статус ок'></img>
        <p className={`text text_type_main-small mt-15`}>Ваш заказ начали готовить</p>
        <p className={`text text_type_main-default text_color_inactive mt-2 mb-30`}>Дождитесь готовности на орбитальной станции</p>
      </div>
    </Modal>
  )
}

OrderDetails.propTypes = {
  toClose: PropTypes.func.isRequired,
  isOpened: PropTypes.bool.isRequired
}

export default OrderDetails;
