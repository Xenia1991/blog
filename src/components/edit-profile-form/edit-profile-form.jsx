import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import classes from './edit-profile-form.module.scss';
import { schema } from './schema';

const EditProfileForm = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = (evt) => {
    console.log(evt);
    reset();
  };

  return (
    <div className={classes['edit-form-container']}>
      <form method="put" className={classes['edit-form']} onSubmit={handleSubmit(onSubmit)}>
        <h5 className={classes['edit-form__header']}>Edit Profile</h5>
        <label className={classes['edit-form__username-label']}>
          <p className={classes['edit-form__text']}>Username</p>
          <input type="text" className={classes['edit-form__input']} {...register('username')} />
          <div className={classes['edit-form__validation-error']}>{errors?.username?.message}</div>
        </label>
        <label className={classes['edit-form__email-label']}>
          <p className={classes['edit-form__text']}>Email address</p>
          <input type="email" className={classes['edit-form__input']} {...register('email')} />
          <div className={classes['edit-form__validation-error']}>{errors?.email?.message}</div>
        </label>
        <label className={classes['edit-form__password-label']}>
          <p className={classes['edit-form__text']}>New password</p>
          <input type="password" className={classes['edit-form__input']} {...register('password')} />
          <div className={classes['edit-form__validation-error']}>{errors?.password?.message}</div>
        </label>
        <label className={classes['edit-form__avatar-label']}>
          <p className={classes['edit-form__text']}>Avatar image (url)</p>
          <input type="url" className={classes['edit-form__input']} {...register('avatar')} />
          <div className={classes['edit-form__validation-error']}>{errors?.avatar?.message}</div>
        </label>
        <button type="submit" className={classes['edit-form__button']} disabled={!isValid}>
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProfileForm;
