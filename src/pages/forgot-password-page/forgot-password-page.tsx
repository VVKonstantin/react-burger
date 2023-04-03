import { useState, ChangeEvent, FormEvent, FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EmailInput, Button }
  from '@ya.praktikum/react-developer-burger-ui-components';
import { requestForgottenPassword } from '../../utils/api';
import styles from './forgot-password-page.module.css';

const ForgotPasswordPage: FC = () => {

  const navigate = useNavigate();
  const [form, setValue] = useState({ email: '' });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    requestForgottenPassword(form)
      .then(res => {
        if (res.success) {
          localStorage.setItem('codesent', 'true');
          navigate('/reset-password');
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <section className={styles.container}>
      <h1 className={`${styles.title} text text_type_main-medium pb-6`}>Восстановление пароля</h1>
      <form className={styles.form} onSubmit={onSubmit}>
        <EmailInput placeholder='Укажите e-mail' name='email' value={form.email} onChange={onChange} />
        <Button htmlType="submit" type="primary" size="medium">
          Восстановить
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?
        <Link to='/login' className={styles.link}>Войти</Link>
      </p>
    </section>
  )
}

export default ForgotPasswordPage;
