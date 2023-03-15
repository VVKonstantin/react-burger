import React, { useEffect, FC } from 'react';
import { useDispatch, useSelector } from '../../services/hooks/hooks';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AppHeader from '../app-header/app-header';
import { UserOrdersPage, FeedPage, ForgotPasswordPage, MainPage, LoginPage, IngredientPage, PageNotFound, ProfileFormPage, ProfilePage, RegisterPage, ResetPasswordPage, OrderInfoPage } from '../../pages/index';
import { ProtectedRouteElement } from '../protected-route-element/protected-route-element';
import { getProfileUser } from '../../services/actions/auth';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import styles from './app.module.css';
import { getCookie } from '../../utils/cookie';
import { getIngredients } from '../../services/actions/ingredients';

const App: FC = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const background: string = location.state?.locationIng || location.state?.locationFeed ||
    location.state?.locationProfile || location;

  const [openedIngredientsModal, setIngredientsModalOpened] = React.useState(false);
  const [openedFeedModal, setFeedModalOpened] = React.useState(false);

  const handleCloseIngredientModal = () => {
    setIngredientsModalOpened(false);
    navigate(-1);
  };

  const handleCloseFeedModal = () => {
    setFeedModalOpened(false);
    navigate(-1);
  }

  const user = useSelector(store => store.auth.user);

  useEffect(() => {
    if(getCookie('accessToken')) dispatch(getProfileUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main className={styles.main}>
          <Routes location={background}>
            <Route path='/' element={<MainPage toClick={setIngredientsModalOpened} />} />
            <Route path='/login' element={<ProtectedRouteElement element={<LoginPage />} />} />
            <Route path='/register' element={<ProtectedRouteElement element={<RegisterPage />} />} />
            <Route path='/forgot-password' element={<ProtectedRouteElement element={<ForgotPasswordPage />} />} />
            <Route path='/reset-password' element={<ProtectedRouteElement element={<ResetPasswordPage />} />} />
            <Route path='/profile' element={<ProtectedRouteElement element={<ProfilePage />} />} >
              <Route path='' element={<ProfileFormPage />} />
              <Route path='orders' element={<UserOrdersPage toClick={setFeedModalOpened} />} />
              <Route path='logout' element={<PageNotFound />} />
            </Route>
            <Route path='/profile/orders/:id' element={<ProtectedRouteElement element={<OrderInfoPage />} />} />
            <Route path='/feed' element={<FeedPage toClick={setFeedModalOpened} />}></Route>
            <Route path='/feed/:id' element={<OrderInfoPage />}></Route>
            <Route path={`/ingredients/:id`} element={<IngredientPage />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>

          {location.state?.locationIng && (
            <Routes>
              <Route path="/ingredients/:id" element={<Modal isOpened={openedIngredientsModal} toClose={handleCloseIngredientModal} ><IngredientDetails /></Modal>} />
            </Routes>
          )}

          {location.state?.locationFeed && (
            <Routes>
              <Route path="/feed/:id" element={<Modal isOpened={openedFeedModal} toClose={handleCloseFeedModal} ><OrderInfoPage type={'modal'} /></Modal>} />
            </Routes>
          )}

          {location.state?.locationProfile && (
            <Routes>
              <Route path="/profile/orders/:id" element={<Modal isOpened={openedFeedModal} toClose={handleCloseFeedModal} ><OrderInfoPage type={'modal'} /></Modal>} />
            </Routes>
          )}

        </main>
      </DndProvider>
    </div>
  )
}

export default App;
