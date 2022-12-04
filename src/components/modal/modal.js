import React from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import { ingredientType } from "../../utils/types.js";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientDetails from "../ingredient-details/ingredient-details.js";
import ModalOverlay from "../modal-overlay/modal-overlay.js";
import OrderDetails from "../order-details/order-detailes.js";
import styles from './modal.module.css';

function Modal(props) {

  const { toClose, isOpened, numberOrder, item } = props;

  React.useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        toClose();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    }
  }, [isOpened, toClose]);

  return ReactDOM.createPortal(
    <ModalOverlay isOpened={isOpened} toClose={toClose}>
      <div className={styles.modal}>
        <button className={`${styles.close} mt-15 mr-10`} onClick={toClose}>
        <CloseIcon type="primary" />
        </button>
        {item ? <IngredientDetails item={item} /> : <OrderDetails numberOrder={numberOrder} />}
      </div>
    </ModalOverlay>, document.getElementById('modal')
    )
}

Modal.propTypes = {
  toClose: PropTypes.func.isRequired,
  isOpened: PropTypes.bool.isRequired,
  numberOrder: PropTypes.number.isRequired,
  item: ingredientType
}

export default Modal;
