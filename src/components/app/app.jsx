import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import store from '../../redux/store';
import NavigationPanel from '../navigation-panel';
import ArticlesList from '../articles-list';
import Article from '../article';

import classes from './app.module.scss';

const App = () => {
  return (
    <div className={classes.app}>
      <Provider store={store}>
        <NavigationPanel />
        <Routes>
          <Route path="/articles" element={<ArticlesList />} />
          <Route
            path="/article/:slug"
            render={({ match }) => {
              const { slug } = match;
              return <Article slug={slug} />;
            }}
          />
        </Routes>
      </Provider>
    </div>
  );
};

export default App;
