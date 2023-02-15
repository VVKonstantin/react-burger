import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { EmailInput, PasswordInput, Button }
  from '@ya.praktikum/react-developer-burger-ui-components';
import { loginUser } from '../../services/actions/auth';
import styles from './login-page.module.css';

function LoginPage() {

  const dispatch = useDispatch();

  const [form, setValue] = useState({ email: '', password: '' });

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  return (
    <section className={styles.container}>
      <h1 className={`${styles.title} text text_type_main-medium pb-6`}>Вход</h1>
      <form className={styles.form} onSubmit={onSubmit}>
        <EmailInput name='email' value={form.email} onChange={onChange} />
        <PasswordInput name='password' value={form.password} onChange={onChange} />
        <Button htmlType="submit" type="primary" size="medium">
          Войти
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mb-4">Вы - новый пользователь?
        <Link to='/register' className={styles.link}>Зарегистрироваться</Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">Забыли пароль?
        <Link to='/forgot-password' className={styles.link}>Восстановить пароль</Link>
      </p>
    </section>
  )
}

export default LoginPage;
