import { combineReducers } from 'redux';

import { getArticlesReducer } from './article-reducer';
import { accountReducer } from './account-reducer';

const rootReducer = combineReducers({
  articles: getArticlesReducer,
  account: accountReducer,
});

export default rootReducer;
