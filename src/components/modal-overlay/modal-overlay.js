import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { SET_INGREDIENT_INFO } from '../../services/actions/ingredient';
import styles from './modal-overlay.module.css';

function ModalOverlay(props) {

  const { isOpened, toClose, children } = props;
  const dispatch = useDispatch();
  const location = useLocation();

  const { id } = useParams();

  //this code to support f5 ingredient modal
  const { ingredients } = useSelector(store => ({
    ingredients: store.ingredients.ingredientsList
  }));
  if (location.pathname.startsWith('/ingredients')) {
    const item = ingredients.find(item => item._id === id);
    if (item) {
      dispatch({
        type: SET_INGREDIENT_INFO,
        item: item
      });
    }
  }

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
