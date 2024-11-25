import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import classes from './sign-in-form.module.scss';
import { schema } from './shema';

const SignInForm = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

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
            {...register('email')}
            type="email"
            className={errors?.email ? classes['sign-in-form__input--error'] : classes['sign-in-form__input']}
            placeholder="Email address"
          />
          <div className={classes['sign-in-form__validation-error']}>
            {errors?.email ? errors?.email?.message : null}
          </div>
        </label>
        <label className={classes['sign-in-form__password-label']}>
          <p className={classes['sign-in-form__text']}>Password</p>
          <input
            {...register('password')}
            type="password"
            className={errors?.password ? classes['sign-in-form__input--error'] : classes['sign-in-form__input']}
            placeholder="Password"
          />
          <div className={classes['sign-in-form__validation-error']}>
            {errors?.password ? errors?.password?.message : null}
          </div>
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
