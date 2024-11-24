/* eslint-disable react/jsx-props-no-spreading */
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import classes from './sign-in-form.module.scss';

const SignInForm = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({ mode: 'onBlur' });

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
    reset();
  };

  return (
    <section className={classes['sign-in-section']}>
      <form className={classes['sign-in-form']} method="get" onSubmit={handleSubmit(onSubmit)}>
        <h3 className={classes['sign-in-form__header']}>Sign In</h3>
        <label className={classes['sign-in-form__email-label']}>
          <p className={classes['sign-in-form__text']}>Email address</p>
          <input
            {...register('email', {
              required: 'Обязательное поле',
              minLength: { value: 5, message: 'Минимум 5 символов' },
            })}
            type="email"
            className={classes['sign-in-form__input']}
            placeholder="Email address"
          />
          <div style={{ height: '20px' }}>{errors?.email && <p>{errors?.email?.message || 'Error!'}</p>}</div>
        </label>
        <label className={classes['sign-in-form__password-label']}>
          <p className={classes['sign-in-form__text']}>Password</p>
          <input type="password" className={classes['sign-in-form__input']} placeholder="Password" />
        </label>
        <button type="submit" className={classes['sign-in-form__button']} disabled={!isValid}>
          Login
        </button>
        <p className={classes['sign-in-form__notification']}>
          Don&apos;t have an account?{' '}
          <Link to="/sign-up" className={classes['sign-in-form__link']}>
            Sign Up.
          </Link>
        </p>
      </form>
    </section>
  );
};

export default SignInForm;
