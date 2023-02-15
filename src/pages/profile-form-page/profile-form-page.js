import { useEffect, useState } from 'react';
import { EmailInput, Input, PasswordInput, Button }
  from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile-form-page.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfileUser } from '../../services/actions/auth';

function ProfileFormPage() {

  const dispatch = useDispatch();
  const { user } = useSelector(store => ({
    user: store.auth.user
  }));

  const [form, setValue] = useState({ name: '', email: '', password: '', isEdited: false });

  const handleCancel = e => {
    e.preventDefault();
    setValue({ name: user.name, email: user.email, password: '' });
  }

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(updateProfileUser(form));
    setValue({ ...form, isEdited: false });
  }

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value, isEdited: true });
  };

  useEffect(() => {
    setValue({ name: user.name, email: user.email, password: '' });
  }, [user]);

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input placeholder='Имя' name='name' icon='EditIcon' value={form.name} onChange={onChange} />
        <EmailInput placeholder='Логин' name='email' icon='EditIcon' value={form.email} onChange={onChange} />
        <PasswordInput name='password' icon='EditIcon' value={form.password} onChange={onChange} />
        {form.isEdited && (
          <div className={styles.buttons}>
            <button type='button' className={`${styles.button} text text_type_main-small`} onClick={handleCancel}>Отмена</button>
            <Button htmlType="submit" type="primary" size="medium">Сохранить</Button>
          </div>
        )}
      </form>
    </div>
  )
}

export default ProfileFormPage;
