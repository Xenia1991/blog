import { combineReducers } from 'redux';

import { getArticlesReducer } from './article-reducer';

const rootReducer = combineReducers({
  articles: getArticlesReducer,
});

export default rootReducer;
