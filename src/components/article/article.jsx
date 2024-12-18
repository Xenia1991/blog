import { useEffect, useMemo, useState } from 'react';
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
import { deleteArticleThunk, createArticleSlice } from '../../redux/my-article-reducer';
import Loader from '../loader';
import Error from '../error/error';
import avatar from '../../assets/images/avatar.png';

import classes from './article.module.scss';

const Article = () => {
  const user = useSelector((state) => state.account.user);
  const article = useSelector((state) => state.articles.article);
  const isLoading = useSelector((state) => state.articles.isLoading);
  const isError = useSelector((state) => state.articles.isError);
  const page = useSelector((state) => state.articles.page);
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const token = useMemo(() => {
    let userToken;
    if (user) {
      userToken = user.token;
    } else {
      userToken = JSON.parse(localStorage.getItem('token'));
    }
    return userToken;
  }, [user]);
  const { slug } = useParams();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const { Text } = Typography;
  const info = {
    token,
    slug: slug || article.slug,
    offset: page === 0 ? 0 : (page - 1) * 5,
  };
  let tags;

  useEffect(() => {
    dispatch(fetchArticlesThunk(info));
    dispatch(fetchArticleThunk(info));
  }, []);

  const showPopconfirm = () => {
    setOpen(true);
  };

  const handleOk = () => {
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

  const handleFavorite = () => {
    dispatch(fetchFavoriteThunk(info));
  };

  const handleUnfavorite = () => {
    dispatch(fetchUnfavoriteThunk(info));
  };

  const handleEdit = () => {
    dispatch(createArticleSlice.actions.edit());
  };

  const defineFavorite = () => {
    let buttonClass;
    if (user && article.favorited) {
      buttonClass = classes['article__likes-section-favorite'];
    } else if (user && !article.favorited) {
      buttonClass = classes['article__likes-section-unfavorite'];
    } else {
      buttonClass = classes['article__likes-section-unfavorite'];
    }
    return buttonClass;
  };

  if (!article || isLoading) {
    return <Loader />;
  }

  if (article.tagList) {
    tags = article.tagList.map((tag) => (
      <Text code key={nanoid()}>
        {tag}
      </Text>
    ));
  } else {
    tags = [];
  }

  if (isError) {
    return <Error />;
  }
  const creationDate = format(new Date(article.createdAt), 'MMMM dd, yyyy');
  const buttonFavorite = defineFavorite();
  return (
    <section className={classes['article-section']}>
      <div className={classes['article']}>
        <section className={classes['article__text-section']}>
          <div className={classes['article__header']}>
            <h5 className={classes['article__title']}>{article.title}</h5>
            <button
              type="button"
              className={buttonFavorite}
              onClick={article.favorited ? handleUnfavorite : handleFavorite}
              disabled={!user}
            >
              {article.favoritesCount}
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
                overlayInnerStyle={{ description: { marginTop: '0px' } }}
                onCancel={handleCancel}
              >
                <button type="button" className={classes['article__delete-button']} onClick={showPopconfirm}>
                  Delete
                </button>
              </Popconfirm>
              <Link
                to={`/articles/${slug}/edit`}
                type="button"
                className={classes['article__edit-button']}
                onClick={handleEdit}
              >
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
