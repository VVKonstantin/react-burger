import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './header-tab.module.css';

function HeaderTab(props) {
  const { children, active, path, handleTab } = props;

  return (

    <Link to={path} className={`${styles.link} pr-5 pl-5`} value={children} onClick={() => handleTab(children)}>
      <props.type type={`${active === children ? "primary" : "secondary"}`} />
      <p className={`text text_type_main-default pl-2 ${active === children ? "" : "text_color_inactive"}`}>
        {children}
      </p>
    </Link>

  )
}

HeaderTab.propTypes = {
   children: PropTypes.string.isRequired,
   active: PropTypes.string.isRequired,
   path: PropTypes.string.isRequired,
   handleTab : PropTypes.func.isRequired
}

export default HeaderTab;
