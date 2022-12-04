import PropTypes from 'prop-types';
import styles from './header-tab.module.css';

function HeaderTab(props) {

  const { isActive, children } = props;

  return (
    <a className={`${styles.link} pl-5 pr-5`} href='#'>
      <props.type type={`${isActive ? 'primary' : 'secondary'}`} />
      <p className={`text text_type_main-default ${isActive ? '' : `${styles.text_noActive}`} pl-2`}>{children}</p>
    </a>
  )
}

HeaderTab.propTypes = {
  isActive: PropTypes.bool.isRequired,
  children: PropTypes.string.isRequired
}

export default HeaderTab;
