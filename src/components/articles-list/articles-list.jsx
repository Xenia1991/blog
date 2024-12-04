import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { nanoid } from 'nanoid';

import ArticlePreview from '../article-preview/article-preview';
import Paginations from '../pagination';
import Loader from '../loader';
import Error from '../error/error';
import { fetchArticlesThunk } from '../../redux/article-reducer';
import { accountReducerSlice } from '../../redux/account-reducer';

import classes from './articles-list.module.scss';

const ArticlesList = () => {
  const articles = useSelector((state) => state.articles.articles);
  const isLoading = useSelector((state) => state.articles.isLoading);
  const isError = useSelector((state) => state.articles.isError);
  const page = useSelector((state) => state.articles.page);
  const user = useSelector((state) => state.account.user);
  let token;
  const dispatch = useDispatch();
  if (user) {
    token = user.token;
  }
  useEffect(() => {
    dispatch(fetchArticlesThunk(0));
    dispatch(accountReducerSlice.actions.setUser());
  }, []);

  useEffect(() => {
    const info = {
      offset: page === 0 ? 0 : (page - 1) * 5,
      token,
    };
    dispatch(fetchArticlesThunk(info));
  }, [dispatch, page]);

  if (!articles || isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error />;
  }

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
