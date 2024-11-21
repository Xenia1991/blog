import NavigationPanel from '../navigation-panel';
import ArticlesList from '../articles-list';
import Paginations from '../pagination';

import classes from './app.module.scss';

const App = () => {
  return (
    <div className={classes.app}>
      <NavigationPanel />
      <ArticlesList />
      <Paginations />
    </div>
  );
};

export default App;
