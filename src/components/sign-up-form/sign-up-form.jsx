import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import classes from './sign-up-form.module.scss';
import { schema } from './schema';

const SignUpForm = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = () => {
    console.log('u changed forms');
    reset();
  };

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <section className={classes['sign-up-container']}>
      <form method="post" className={classes['sign-up-form']} onSubmit={handleSubmit(onSubmit)}>
        <h3 className={classes['sign-up-form__header']}>Create new account</h3>
        <label className={classes['sign-up-form__username-label']}>
          <p className={classes['sign-up-form__text']}>Username</p>
          <input
            {...register('username')}
            type="text"
            placeholder="username"
            className={errors?.username ? classes['sign-up-form__input--error'] : classes['sign-up-form__input']}
          />
          <div className={classes['sign-up-form__validation-error']}>{errors?.username?.message}</div>
        </label>
        <label className={classes['sign-up-form__email-label']}>
          <p className={classes['sign-up-form__text']}>Email address</p>
          <input
            {...register('email')}
            type="email"
            placeholder="Email address"
            className={errors?.email ? classes['sign-up-form__input--error'] : classes['sign-up-form__input']}
          />
          <div className={classes['sign-up-form__validation-error']}>{errors?.email?.message}</div>
        </label>
        <label className={classes['sign-up-form__password-label']}>
          <p className={classes['sign-up-form__text']}>Password</p>
          <input
            {...register('password')}
            type="password"
            placeholder="Password"
            className={errors?.password ? classes['sign-up-form__input--error'] : classes['sign-up-form__input']}
          />
          <div className={classes['sign-up-form__validation-error']}>{errors?.password?.message}</div>
        </label>
        <label className={classes['sign-up-form__password-label']}>
          <p className={classes['sign-up-form__text']}>Repeat Password</p>
          <input
            {...register('repeatPassword')}
            type="password"
            placeholder="Password"
            className={errors?.repeatPassword ? classes['sign-up-form__input--error'] : classes['sign-up-form__input']}
          />
          <div className={classes['sign-up-form__validation-error']}>{errors?.repeatPassword?.message}</div>
        </label>
        <div className={classes['sign-up-form__agreement']}>
          <input
            type="checkbox"
            {...register('tandc')}
            className={errors?.tandc ? classes['sign-up-form__input--error'] : classes['sign-up-form__input']}
          />
          <span>I agree to the processing of my personal information</span>
        </div>
        <div className={classes['sign-up-form__validation-error']}>{errors?.tandc?.message}</div>
        <button type="submit" className={classes['sign-up-form__button']} disabled={!isValid}>
          Create
        </button>
        <p className={classes['sign-up-form__notification']}>
          Already have an account?{' '}
          <Link to="/sign-in" className={classes['sign-up-form__link']}>
            Sign In.
          </Link>
        </p>
      </form>
    </section>
  );
};

export default SignUpForm;
