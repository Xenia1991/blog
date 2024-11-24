import { Link } from 'react-router-dom';

import classes from './sign-in-form.module.scss';

const SignInForm = () => {
  return (
    <section className={classes['sign-in-section']}>
      <form className={classes['sign-in-form']} method="get">
        <h3 className={classes['sign-in-form__header']}>Sign In</h3>
        <label className={classes['sign-in-form__email-label']}>
          <p className={classes['sign-in-form__text']}>Email address</p>
          <input type="email" className={classes['sign-in-form__input']} placeholder="Email address" />
        </label>
        <label className={classes['sign-in-form__password-label']}>
          <p className={classes['sign-in-form__text']}>Password</p>
          <input type="password" className={classes['sign-in-form__input']} placeholder="Password" />
        </label>
        <button type="submit" className={classes['sign-in-form__button']}>
          Login
        </button>
        <p className={classes['sign-in-form__notification']}>
          Don&apos;t have an account?{' '}
          <Link to="/sing-up" className={classes['sign-in-form__link']}>
            Sign Up.
          </Link>
        </p>
      </form>
    </section>
  );
};

export default SignInForm;
