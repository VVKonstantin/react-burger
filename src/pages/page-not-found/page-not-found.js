import { Button }
  from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './page-not-found.module.css';

function PageNotFound() {

const onClick = () => {
  window.history.back();
}

  return (
    <div className={styles.container}>
      <p className='text text_type_digits-large'>404</p>
      <p className='text text_type_main-medium mb-10'>cтраницы пока не существует</p>
      <Button htmlType='button' size='medium' type='primary' onClick={ onClick }>Вернуться</Button>
    </div>
  )
}

export default PageNotFound;
