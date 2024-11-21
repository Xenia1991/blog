import ArticlePreview from '../article-preview/article-preview';

import classes from './articles-list.module.scss';

const ArticlesList = () => {
  return (
    <ul className={classes['articles-list']}>
      <ArticlePreview />
      <ArticlePreview />
      <ArticlePreview />
      <ArticlePreview />
      <ArticlePreview />
    </ul>
  );
};

export default ArticlesList;
