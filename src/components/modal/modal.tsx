import React, { FC, ReactNode } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from './modal.module.css';

interface IModalProps {
  toClose: () => void;
  isOpened: boolean;
  children: ReactNode;
}

const Modal: FC<IModalProps> = ({ toClose, isOpened, children }) => {

  React.useEffect(() => {
    if (!isOpened) return;

    const handleEscClose = (evt: { key: string }) => {
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
        <button type="button" title='close' className={`${styles.close} mt-15 mr-10`} onClick={toClose}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </ModalOverlay>, document.getElementById('modal') as HTMLElement
  )
}

export default Modal;
