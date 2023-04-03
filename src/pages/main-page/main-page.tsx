import { FC } from 'react';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import styles from './main-page.module.css';

interface IMainPageProps {
  toClick: (arg: boolean) => void;
}

const MainPage: FC<IMainPageProps> = ({ toClick }) => {

  return (
    <>
      <h1 className={`text text_type_main-large ${styles.header} mt-10 mb-5`}>Соберите бургер</h1>
      <div className={styles.main__container}>
        <BurgerIngredients toClick={toClick} />
        <BurgerConstructor />
      </div>
    </>
  )
}

export default MainPage;
