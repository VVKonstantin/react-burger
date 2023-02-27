import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import styles from './modal-overlay.module.css';

function ModalOverlay(props) {

  const { isOpened, toClose, children } = props;

  const { id } = useParams();

  const isOp = isOpened || id;
  const handleToHideModal = (evt) => {
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

ModalOverlay.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  toClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}

export default ModalOverlay;
