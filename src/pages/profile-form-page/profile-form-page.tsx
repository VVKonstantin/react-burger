import { useEffect, useState, FC, FormEvent, ChangeEvent, SyntheticEvent } from 'react';
import { EmailInput, Input, PasswordInput, Button }
  from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile-form-page.module.css';
import { useDispatch, useSelector } from '../../services/hooks/hooks';
import { updateProfileUser } from '../../services/actions/auth';

type TUserState = {
  name?: string;
  email?: string;
  password?: string;
  isEdited?: boolean;
}

const ProfileFormPage: FC = () => {

  const dispatch = useDispatch();
  const { user } = useSelector(store => ({
    user: store.auth.user
  }));

  const [form, setValue] = useState<TUserState>({ name: '', email: '', password: '', isEdited: false });

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setValue({ name: user?.name, email: user?.email, password: '' });
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newForm = {name: form.name, email: form.email, password: form.password};
    dispatch(updateProfileUser(newForm));
    setValue({ ...form, isEdited: false });
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value, isEdited: true });
  };

  useEffect(() => {
    setValue({ name: user?.name, email: user?.email, password: '' });
  }, [user]);

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input placeholder='Имя' name='name' icon='EditIcon' value={form.name || ""} onChange={onChange} />
        <EmailInput placeholder='Логин' name='email' isIcon={true} value={form.email || ""} onChange={onChange} />
        <PasswordInput name='password' icon='EditIcon' value={form.password || ""} onChange={onChange} />
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
