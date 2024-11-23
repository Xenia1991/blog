import { Routes, Route } from 'react-router-dom';

import NavigationPanel from '../navigation-panel';
import ArticlesList from '../articles-list';
import Article from '../article';

import classes from './app.module.scss';

const App = () => {
  return (
    <div className={classes.app}>
      <NavigationPanel />
      <Routes>
        <Route path="/" element={<ArticlesList />} />
        <Route path="/articles" element={<ArticlesList />} />
        <Route path="/articles/:slug" element={<Article />} />
      </Routes>
    </div>
  );
};

export default App;
