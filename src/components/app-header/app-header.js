import { HeaderTab } from '../header-tab/header-tab';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <ul className={styles.header__list}>
          <li className={`${styles.header__item} mr-2`}>
            <HeaderTab type={BurgerIcon} text='Конструктор' isActive={true} />
          </li>
          <li className={`${styles.header__item} mr-28`}>
            <HeaderTab type={ListIcon} text='Лента заказов' isActive={false} />
          </li>
        </ul>
        <Logo />
        <div className={`${styles.header__item} ml-2`}>
          <HeaderTab type={ProfileIcon} text='Личный кабинет' isActive={false} />
        </div>
      </div>
    </header>)
}

export default AppHeader;
