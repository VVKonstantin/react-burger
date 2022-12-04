import HeaderTab from '../header-tab/header-tab.js';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <ul className={styles.list}>
          <li className={`${styles.item} mr-2`}>
            <HeaderTab type={BurgerIcon} isActive={true}>Конструктор</HeaderTab>
          </li>
          <li className={`${styles.item} mr-28`}>
            <HeaderTab type={ListIcon} isActive={false}>Лента заказов</HeaderTab>
          </li>
        </ul>
        <Logo />
        <div className={`${styles.item} ml-2`}>
          <HeaderTab type={ProfileIcon} isActive={false}>Личный кабинет</HeaderTab>
        </div>
      </div>
    </header>)
}

export default AppHeader;
