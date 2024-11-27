import { Link } from 'react-router-dom';

import ArticlesList from '../articles-list';

import classes from './success-message.module.scss';

const SuccessMessage = () => {
  return (
    <div className={classes['success-container']}>
      <h1 className={classes['success-container__header']}>Your account was created</h1>
      <Link to="/" element={<ArticlesList />} className={classes['success-container__link']}>
        Go to homepage
      </Link>
    </div>
  );
};

export default SuccessMessage;
