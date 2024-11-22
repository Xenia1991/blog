import { Provider } from 'react-redux';

import store from '../../redux/store';
import NavigationPanel from '../navigation-panel';
import ArticlesList from '../articles-list';
import Paginations from '../pagination';

import classes from './app.module.scss';

const App = () => {
  return (
    <div className={classes.app}>
      <Provider store={store}>
        <NavigationPanel />
        <ArticlesList />
        <Paginations />
      </Provider>
    </div>
  );
};

export default App;
