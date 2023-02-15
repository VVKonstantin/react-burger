import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { registerUser } from '../../services/actions/auth';
import styles from './register-page.module.css';

function RegisterPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setValue] = useState({ name: '', email: '', password: '' });

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    dispatch(registerUser(form));
    navigate('/');
  };

  return (
    <section className={styles.container}>
      <h1 className={`${styles.title} text text_type_main-medium pb-6`}>Регистрация</h1>
      <form className={styles.form} onSubmit={onSubmit}>
        <Input placeholder='Имя' name='name' value={form.name} onChange={onChange} />
        <EmailInput name='email' value={form.email} onChange={onChange} />
        <PasswordInput name='password' value={form.password} onChange={onChange} />
        <Button htmlType="submit" type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?
        <Link to='/login' className={styles.link}>Войти</Link>
      </p>
    </section>
  )
}

export default RegisterPage;
