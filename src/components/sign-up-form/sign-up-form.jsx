import { Checkbox } from 'antd';
import { Link } from 'react-router-dom';

import classes from './sign-up-form.module.scss';

const SignUpForm = () => {
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <section className={classes['sign-up-container']}>
      <form method="post" className={classes['sign-up-form']}>
        <h3 className={classes['sign-up-form__header']}>Create new account</h3>
        <label className={classes['sign-up-form__username-label']}>
          <p className={classes['sign-up-form__text']}>Username</p>
          <input type="text" placeholder="username" className={classes['sign-up-form__input']} />
        </label>
        <label className={classes['sign-up-form__email-label']}>
          <p className={classes['sign-up-form__text']}>Email address</p>
          <input type="email" placeholder="Email address" className={classes['sign-up-form__input']} />
        </label>
        <label className={classes['sign-up-form__password-label']}>
          <p className={classes['sign-up-form__text']}>Password</p>
          <input type="password" placeholder="Password" className={classes['sign-up-form__input']} />
        </label>
        <label className={classes['sign-up-form__password-label']}>
          <p className={classes['sign-up-form__text']}>Repeat Password</p>
          <input type="password" placeholder="Password" className={classes['sign-up-form__input']} />
        </label>
        <div className={classes['sign-up-form__agreement']}>
          <Checkbox onChange={onChange}>I agree to the processing of my personal information</Checkbox>
        </div>
        <button type="submit" className={classes['sign-up-form__button']}>
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
