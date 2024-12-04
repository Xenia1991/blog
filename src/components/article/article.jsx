import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { Typography, Popconfirm } from 'antd';
import { format } from 'date-fns';
import Markdown from 'markdown-to-jsx';
import { useParams, Link, useNavigate } from 'react-router-dom';

import {
  fetchArticleThunk,
  fetchArticlesThunk,
  fetchFavoriteThunk,
  fetchUnfavoriteThunk,
} from '../../redux/article-reducer';
import { deleteArticleThunk } from '../../redux/my-article-reducer';
import Loader from '../loader';
import Error from '../error/error';
import avatar from '../../assets/images/avatar.png';
import favorite from '../../assets/images/favourite.png';
import heart from '../../assets/images/heart.png';

import classes from './article.module.scss';

const Article = () => {
  const article = useSelector((state) => state.articles.article);
  const user = useSelector((state) => state.account.user);
  const isLoading = useSelector((state) => state.articles.isLoading);
  const isError = useSelector((state) => state.articles.isError);
  const dispatch = useDispatch();
  let token;
  const { slug } = useParams();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const navigation = useNavigate();

  if (user) {
    token = user.token;
  } else {
    token = JSON.parse(localStorage.getItem('token'));
  }

  useEffect(() => {
    const info = {
      token,
      slug,
    };
    dispatch(fetchArticlesThunk());
    dispatch(fetchArticleThunk(info));
  }, []);

  const showPopconfirm = () => {
    setOpen(true);
  };

  const handleOk = () => {
    const info = {
      token,
      slug,
    };
    setConfirmLoading(true);
    dispatch(deleteArticleThunk(info));
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
    navigation('/articles');
  };

  const handleCancel = () => {
    setOpen(false);
  };

  if (!article || isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error />;
  }

  const handleFavorite = () => {
    const info = {
      token,
      slug,
    };
    dispatch(fetchFavoriteThunk(info));
  };

  const handleUnfavorite = () => {
    const info = {
      token,
      slug,
    };
    dispatch(fetchUnfavoriteThunk(info));
  };

  const { Text } = Typography;
  let tags;
  if (article.tagList) {
    tags = article.tagList.map((tag) => (
      <Text code key={nanoid()}>
        {tag}
      </Text>
    ));
  } else {
    tags = [];
  }

  const creationDate = format(new Date(article.createdAt), 'MMMM dd, yyyy');

  return (
    <section className={classes['article-section']}>
      <div className={classes['article']}>
        <section className={classes['article__text-section']}>
          <div className={classes['article__header']}>
            <h5 className={classes['article__title']}>{article.title}</h5>
            <button
              type="button"
              className={classes['article__likes-section']}
              onClick={article.favorited ? handleUnfavorite : handleFavorite}
            >
              <img src={article.favorited ? favorite : heart} className={classes['article__like']} alt="like" />
              <span className={classes['article__count']}>{article.favoritesCount}</span>
            </button>
          </div>
          <div className={classes['article__tags-section']}>{tags}</div>
          <div className={classes['article__article-text']}>{article.description}</div>
        </section>
        <section className={classes['article__author-section']}>
          <div className={classes['article__name-date-section']}>
            <div>
              <div className={classes['article__author-name']}>{article.author.username}</div>
              <div className={classes['article__date-of-creation']}>{creationDate}</div>
            </div>
            <img
              src={article.author.image || avatar}
              alt="Author avatar"
              className={classes['article__author-avatar']}
            />
          </div>
          {article.author.username === user?.username ? (
            <div className={classes['article__button']}>
              <Popconfirm
                description="Are you sure to delete this article?"
                open={open}
                onConfirm={handleOk}
                okText="Yes"
                cancelText="No"
                okButtonProps={{
                  loading: confirmLoading,
                }}
                placement="rightTop"
                overlayStyle={{ width: '246px', height: '104px' }}
                overlayInnerStyle={{ marginTop: '0px' }}
                onCancel={handleCancel}
              >
                <button type="button" className={classes['article__delete-button']} onClick={showPopconfirm}>
                  Delete
                </button>
              </Popconfirm>
              <Link to={`/articles/${slug}/edit`} type="button" className={classes['article__edit-button']}>
                Edit
              </Link>
            </div>
          ) : null}
        </section>
      </div>
      <div className={classes['article-body']}>
        <Markdown>{article.body}</Markdown>
      </div>
    </section>
  );
};

export default Article;
