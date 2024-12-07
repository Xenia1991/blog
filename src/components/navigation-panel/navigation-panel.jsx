import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { fetchArticlesThunk } from '../../redux/article-reducer';
import { accountReducerSlice } from '../../redux/account-reducer';
import avatar from '../../assets/images/avatar.png';

import classes from './navigation-panel.module.scss';

const NavigationPanel = () => {
  const page = useSelector((state) => state.articles.page);
  let user = useSelector((state) => state.account.user);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const mainButtonClasses = classNames(classes.navigation__button, classes['navigation__button-main']);
  const signInButton = classNames(classes.navigation__button, classes['navigation__button-sign-in']);
  const signUpButton = classNames(classes.navigation__button, classes['navigation__button-sign-up']);
  const createArticle = classNames(classes.navigation__button, classes['navigation__button-create-article']);
  const profile = classNames(classes.navigation__button, classes['navigation__button-profile']);
  const logOutButton = classNames(classes.navigation__button, classes['navigation__button-log-out']);

  const handleLogoutClick = () => {
    dispatch(accountReducerSlice.actions.logOut());
    navigation('/articles');
  };

  const handleClick = () => {
    dispatch(fetchArticlesThunk((page - 1) * 5));
  };

  if (!user && localStorage.getItem('token') !== null) {
    const dataFromStorage = JSON.parse(localStorage.getItem('user'));
    user = dataFromStorage;
  }

  return (
    <section className={classes.navigation}>
      <Link to="/articles" className={mainButtonClasses} onClick={handleClick}>
        Realworld Blog
      </Link>

      {user ? (
        <div className={classes.navigation__section}>
          <Link to="/new-article" className={createArticle}>
            Create article
          </Link>
          <Link to="/profile" className={profile}>
            <span>{user?.username || 'user'} </span>
            <img src={user?.image || avatar} alt="user avatar" className={classes['navigation__button-image']} />
          </Link>
          <button type="button" className={logOutButton} onClick={handleLogoutClick}>
            Log Out
          </button>
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
