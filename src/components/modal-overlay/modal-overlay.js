import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

function ModalOverlay(props) {

  const { isOpened, toClose, children } = props;

  const handleToHideModal = (evt) => {
    if (isOpened && evt.target === evt.currentTarget) {
      toClose();
    }
  }

  return (
    <div className={`${styles.overlay} ${isOpened ? styles.overlay_opened : ''}`} onMouseDown={handleToHideModal}>
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
