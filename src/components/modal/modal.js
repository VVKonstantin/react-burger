import React from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay.js";
import styles from './modal.module.css';

function Modal(props) {

  const { toClose, isOpened, children } = props;

  React.useEffect(() => {
    if (!isOpened) return;

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
        {children}
      </div>
    </ModalOverlay>, document.getElementById('modal')
  )
}

Modal.propTypes = {
  toClose: PropTypes.func.isRequired,
  isOpened: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
}

export default Modal;
