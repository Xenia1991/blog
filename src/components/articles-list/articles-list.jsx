import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { nanoid } from 'nanoid';

import ArticlePreview from '../article-preview/article-preview';
import Paginations from '../pagination';
import { fetchArticlesThunk } from '../../redux/article-reducer';

import classes from './articles-list.module.scss';

const ArticlesList = () => {
  const articles = useSelector((state) => state.articles.articles);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticlesThunk(0));
  }, [dispatch]);

  const articlesList = articles.map((article) => {
    return <ArticlePreview article={article} key={nanoid()} />;
  });

  return (
    <section className={classes['articles-section']}>
      <ul className={classes['articles-list']}>{articlesList}</ul>
      <Paginations />
    </section>
  );
};

export default ArticlesList;
