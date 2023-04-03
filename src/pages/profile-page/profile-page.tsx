import { NavLink, useLocation, Outlet, useNavigate } from 'react-router-dom';
import styles from './profile-page.module.css';
import { useDispatch, useSelector } from '../../services/hooks/hooks';
import { FC } from 'react';
import { logoutUser } from '../../services/actions/auth';

const ProfilePage: FC = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector(store => store.auth.user);

  const logout = () => {
    dispatch(logoutUser());
    navigate('/login');
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
