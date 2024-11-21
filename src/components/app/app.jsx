import NavigationPanel from '../navigation-panel';
import ArticlesList from '../articles-list';
import Pagination from '../pagination';

import classes from './app.module.scss';

const App = () => {
  return (
    <div className={classes.app}>
      <NavigationPanel />
      <ArticlesList />
      <Pagination />
    </div>
  );
};

export default App;
