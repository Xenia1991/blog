import { combineReducers } from 'redux';

import { getArticlesReducer } from './article-reducer';
import { accountReducer } from './account-reducer';
import { createArticleReducer } from './my-article-reducer';

const rootReducer = combineReducers({
  articles: getArticlesReducer,
  account: accountReducer,
  myArticle: createArticleReducer,
});

export default rootReducer;
