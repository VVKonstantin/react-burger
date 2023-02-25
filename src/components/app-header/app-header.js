import HeaderTab from '../header-tab/header-tab.js';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function AppHeader() {

  const [active, setActive] = useState('Конструктор');
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/feed')) setActive('Лента заказов');
    else if (location.pathname.startsWith('/profile') || location.pathname.startsWith('/login')) setActive('Личный кабинет');
    else setActive('Конструктор');
  }, [location]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <ul className={styles.list}>
          <li className={`${styles.item} mr-2`}>
            <HeaderTab type={BurgerIcon} active={active} handleTab={setActive} path={'/'}>Конструктор</HeaderTab>
          </li>
          <li className={`${styles.item} mr-28`}>
            <HeaderTab type={ListIcon} active={active} handleTab={setActive} path={'/feed'}>Лента заказов</HeaderTab>
          </li>
        </ul>
        <Logo />
        <div className={`${styles.item} ml-2`}>
          <HeaderTab type={ProfileIcon} active={active} handleTab={setActive} path='/profile'>Личный кабинет</HeaderTab>
        </div>
      </div>
    </header>)
}

export default AppHeader;
