import { Routes, Route } from 'react-router-dom';

import NavigationPanel from '../navigation-panel';
import ArticlesList from '../articles-list';
import Article from '../article';
import SignInForm from '../sign-in-form';
import SignUpForm from '../sign-up-form';
import EditProfileForm from '../edit-profile-form';
import ArticleForm from '../article-form';

import classes from './app.module.scss';

const App = () => {
  return (
    <div className={classes.app}>
      <NavigationPanel />
      <Routes>
        <Route path="/" element={<ArticlesList />} />
        <Route path="/articles" element={<ArticlesList />} />
        <Route path="/articles/:slug" element={<Article />} />
        <Route path="/articles/:slug/edit" element={<ArticleForm />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/profile" element={<EditProfileForm />} />
        <Route path="/new-article" element={<ArticleForm />} />
      </Routes>
    </div>
  );
};

export default App;
