import styles from './header-tab.module.css';

export function HeaderTab(props) {
  return (
    <a className={`${styles.link} pl-5 pr-5`}>
      <props.type type={`${props.isActive ? 'primary' : 'secondary'}`} />
      <p className={`text text_type_main-default ${props.isActive ? '' : `${styles.text_noActive}`} pl-2`}>{props.text}</p>
    </a>
  );
}
