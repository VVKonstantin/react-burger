import { FC, ReactNode } from "react";
import { useParams } from 'react-router-dom';
import styles from './modal-overlay.module.css';

interface IModalOverlayProps {
  toClose: () => void;
  isOpened: boolean;
  children: ReactNode;
}

const ModalOverlay: FC<IModalOverlayProps> =({ isOpened, toClose, children }) => {

  const { id } = useParams();

  const isOp = isOpened || id;

  const handleToHideModal = (evt: {target: EventTarget, currentTarget: EventTarget}) => {
    if (isOp && evt.target === evt.currentTarget) {
      toClose();
    }
  }

  return (
    <div className={`${styles.overlay} ${isOp ? styles.overlay_opened : ''}`} onMouseDown={handleToHideModal}>
      {children}
    </div>
  )
}

export default ModalOverlay;
