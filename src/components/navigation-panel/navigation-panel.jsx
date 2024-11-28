import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { fetchArticlesThunk } from '../../redux/article-reducer';
import { accountReducerSlice } from '../../redux/account-reducer';

import classes from './navigation-panel.module.scss';

const NavigationPanel = () => {
  const page = useSelector((state) => state.articles.page);
  const user = useSelector((state) => state.account.user);
  const dispatch = useDispatch();
  const mainButtonClasses = classNames(classes.navigation__button, classes['navigation__button-main']);
  const signInButton = classNames(classes.navigation__button, classes['navigation__button-sign-in']);
  const signUpButton = classNames(classes.navigation__button, classes['navigation__button-sign-up']);
  const createArticle = classNames(classes.navigation__button, classes['navigation__button-create-article']);
  const profile = classNames(classes.navigation__button, classes['navigation__button-profile']);
  const logOutButton = classNames(classes.navigation__button, classes['navigation__button-log-out']);

  const handleLogoutClick = () => {
    dispatch(accountReducerSlice.actions.logOut());
  };

  const handleClick = () => {
    dispatch(fetchArticlesThunk((page - 1) * 5));
  };

  return (
    <section className={classes.navigation}>
      <Link to="/articles" className={mainButtonClasses} onClick={handleClick}>
        Realworld Blog
      </Link>

      {user ? (
        <div className={classes.navigation__section}>
          <a href="/" className={createArticle}>
            Create article
          </a>
          <Link to="/profile" className={profile}>
            {user?.username || 'user'}
          </Link>
          <a href="/" className={logOutButton} onClick={handleLogoutClick}>
            Log Out
          </a>
        </div>
      ) : (
        <div className={classes.navigation__section}>
          <Link to="/sign-in" className={signInButton}>
            Sign In
          </Link>
          <Link to="/sign-up" className={signUpButton}>
            Sign Up
          </Link>
        </div>
      )}
    </section>
  );
};

export default NavigationPanel;
