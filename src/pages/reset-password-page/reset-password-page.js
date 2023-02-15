import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input, PasswordInput, Button }
  from '@ya.praktikum/react-developer-burger-ui-components';
import { requestResetForgottenPassword } from '../../utils/api';
import styles from './reset-password-page.module.css';

function ResetPasswordPage() {

  const navigate = useNavigate();
  const [form, setValue] = useState({ email: '', code: '' });

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();

    requestResetForgottenPassword(form)
      .then(res => {
        console.log(res);
        if (res.success) {
          localStorage.removeItem('codesent');
          navigate('/');
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (!localStorage.getItem('codesent')) navigate('/forgot-password');
  })

  return (
    <section className={styles.container}>
      <h1 className={`${styles.title} text text_type_main-medium pb-6`}>Восстановление пароля</h1>
      <form className={styles.form} onSubmit={onSubmit}>
        <PasswordInput placeholder='Введите новый пароль' name='password' value={form.password} onChange={onChange} />
        <Input placeholder='Введите код из письма' name='code' value={form.code} onChange={onChange} />
        <Button htmlType="submit" type="primary" size="medium">
          Сохранить
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?
        <Link to='/login' className={styles.link}>Войти</Link>
      </p>
    </section>
  )
}

export default ResetPasswordPage;
