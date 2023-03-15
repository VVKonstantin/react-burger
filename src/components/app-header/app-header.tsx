import { FC } from 'react';
import { Link } from 'react-router-dom';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const AppHeader: FC = () => {

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
            <Link to='/' className={`${styles.link} pr-5 pl-5`} onClick={() => setActive('Конструктор')}>
              <BurgerIcon type={`${active === 'Конструктор' ? "primary" : "secondary"}`} />
              <p className={`text text_type_main-default pl-2 ${active === 'Конструктор' ? "" : "text_color_inactive"}`}>
                Конструктор
              </p>
            </Link>
          </li>
          <li className={`${styles.item} mr-28`}>
            <Link to='/feed' className={`${styles.link} pr-5 pl-5`} onClick={() => setActive('Лента заказов')}>
              <ListIcon type={`${active === 'Лента заказов' ? "primary" : "secondary"}`} />
              <p className={`text text_type_main-default pl-2 ${active === 'Лента заказов' ? "" : "text_color_inactive"}`}>
                Лента заказов
              </p>
            </Link>
          </li>
        </ul>
        <Logo />
        <div className={`${styles.item} ml-2`}>
          <Link to='/profile' className={`${styles.link} pr-5 pl-5`} onClick={() => setActive('Личный кабинет')}>
            <ProfileIcon type={`${active === 'Личный кабинет' ? "primary" : "secondary"}`} />
            <p className={`text text_type_main-default pl-2 ${active === 'Личный кабинет' ? "" : "text_color_inactive"}`}>
              Личный кабинет
            </p>
          </Link>
        </div>
      </div>
    </header>)
}

export default AppHeader;
