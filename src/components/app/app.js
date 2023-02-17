import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AppHeader from '../app-header/app-header.js';
import { ForgotPasswordPage, MainPage, LoginPage, PageNotFound, ProfileFormPage, ProfilePage, RegisterPage, ResetPasswordPage } from '../../pages/index.jsx';
import { ProtectedRouteElement } from '../protected-route-element/protected-route-element.js';
import { getProfileUser } from '../../services/actions/auth';
import Modal from '../modal/modal.js';
import IngredientPage from '../../pages/ingredient-page/ingredient-page.js';
import IngredientDetails from '../ingredient-details/ingredient-details.js';
import { DEL_INGREDIENT_INFO } from '../../services/actions/ingredient.jsx';
import styles from './app.module.css';
import { getCookie } from '../../utils/cookie.js';
import { getIngredients } from '../../services/actions/ingredients.jsx';

function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state && location.state.background;

  const [openedIngredientsModal, setIngredientsModalOpened] = React.useState(false);

  const handleCloseIngredientModal = () => {
    setIngredientsModalOpened(false);
    dispatch({ type: DEL_INGREDIENT_INFO });
    navigate(-1);
  };

  const user = useSelector(store => store.auth.user);

  useEffect(() => {
    if (getCookie('accessToken')) dispatch(getProfileUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getIngredients);
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main className={styles.main}>
          <Routes location={background || location}>
            <Route path='/' element={<MainPage toClick={setIngredientsModalOpened} />} />
            <Route path='/login' element={<ProtectedRouteElement element={<LoginPage />} />} />
            <Route path='/register' element={<ProtectedRouteElement element={<RegisterPage />} />} />
            <Route path='/forgot-password' element={<ProtectedRouteElement element={<ForgotPasswordPage />} />} />
            <Route path='/reset-password' element={<ProtectedRouteElement element={<ResetPasswordPage />} />} />
            <Route path='/profile' element={<ProtectedRouteElement element={<ProfilePage />} user={user} />} >
              <Route path='' element={<ProfileFormPage />} />
              <Route path='orders' element={<PageNotFound />} />
              <Route path='logout' element={<PageNotFound />} />
            </Route>
            <Route path='/ingredients/:id' element={<IngredientPage />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>

          {background && (
            <Routes>
              <Route path="/ingredients/:id" element={<Modal isOpened={openedIngredientsModal} toClose={handleCloseIngredientModal}><IngredientDetails /></Modal>} />
            </Routes>
          )}

        </main>
      </DndProvider>
    </div>
  )
}

export default App;
