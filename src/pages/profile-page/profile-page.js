import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation, Outlet } from 'react-router-dom';
import styles from './profile-page.module.css';
import { useDispatch } from 'react-redux';
import { getProfileUser } from '../../services/actions/auth';
import { logoutUser } from '../../services/actions/auth';

function ProfilePage() {

  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector(store => store.auth.user);

  useEffect(() => {
    dispatch(getProfileUser());
  }, [dispatch]);

  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    user ? (
    <section className={`${styles.container}`}>
      <div className={`${styles.menu} mr-15`}>
        <nav>
          <ul className={styles.list}>
            <li className={styles.item}>
              <NavLink to='/profile' className={location.pathname === '/profile'
                ? `${styles.link} ${styles.active} text text_type_main-medium`
                : `${styles.link} text text_type_main-medium text_color_inactive`}>
                Профиль
              </NavLink>
            </li>
            <li className={styles.item}>
              <NavLink to='/profile/orders' className={location.pathname === '/profile/orders'
                ? `${styles.link} ${styles.active} text text_type_main-medium`
                : `${styles.link} text text_type_main-medium text_color_inactive`}>
                История заказов
              </NavLink>
            </li>
            <li className={styles.item}>
              <NavLink to='/login' className={location.pathname === '/profile/logout'
                ? `${styles.link} ${styles.active} text text_type_main-medium`
                : `${styles.link} text text_type_main-medium text_color_inactive`} onClick={logout}>
                Выход
              </NavLink>
            </li>
          </ul>
        </nav>
        <p className={`${styles.text} text text_type_main-default text_color_inactive mt-20`}>В этом разделе вы можете изменить свои персональные данные</p>
      </div>
      <Outlet />
    </section>
    ) : <></>
  )
}

export default ProfilePage;
