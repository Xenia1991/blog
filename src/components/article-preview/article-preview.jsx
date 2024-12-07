import { useMemo } from 'react';
import { Typography } from 'antd';
import { nanoid } from 'nanoid';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchArticleThunk, fetchFavoriteThunk, fetchUnfavoriteThunk } from '../../redux/article-reducer';
import avatar from '../../assets/images/avatar.png';

import classes from './article-preview.module.scss';

const ArticlePreview = ({ article }) => {
  const user = useSelector((state) => state.account.user);
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
  const { slug } = article;
  const info = {
    token,
    slug,
  };
  const { Text } = Typography;

  const cutTitle = (title) => {
    if (title.length > 40) {
      const cuttedTitle = `${title.split('').slice(0, 40).join('')}...`;
      return cuttedTitle;
    }
    return title;
  };

  const cuttedDescription = (description) => {
    if (description.length > 150) {
      const cuttedTitle = `${description.split('').slice(0, 150).join('')}...`;
      return cuttedTitle;
    }
    return description;
  };

  const handleClick = () => {
    dispatch(fetchArticleThunk(info));
  };

  const handleFavorite = () => {
    dispatch(fetchFavoriteThunk(info));
  };

  const handleUnfavorite = () => {
    dispatch(fetchUnfavoriteThunk(info));
  };

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
  const { image, username } = article.author;
  const title = cutTitle(article.title);
  const description = cuttedDescription(article.description);

  const defineFavorite = () => {
    let buttonClass;
    if (user && article.favorited) {
      buttonClass = classes['article-preview__likes-section-favorite'];
    } else if (user && !article.favorited) {
      buttonClass = classes['article-preview__likes-section-unfavorite'];
    } else {
      buttonClass = classes['article-preview__likes-section-unfavorite'];
    }
    return buttonClass;
  };

  const buttonFavorite = defineFavorite();
  return (
    <li className={classes['article-preview']}>
      <section className={classes['article-preview__text-section']}>
        <div className={classes['article-preview__header']}>
          <Link to={`/articles/${slug}`} className={classes['article-preview__title']} onClick={handleClick}>
            {title}
          </Link>
          <button
            type="button"
            onClick={article.favorited ? handleUnfavorite : handleFavorite}
            className={buttonFavorite}
            disabled={!user}
          >
            {article.favoritesCount}
          </button>
        </div>
        <div className={classes['article-preview__tags-section']}>{tags}</div>
        <div className={classes['article-preview__article-text']}>{description}</div>
      </section>
      <section className={classes['article-preview__author-section']}>
        <div className={classes['article-preview__name-date-section']}>
          <div className={classes['article-preview__author-name']}>{username}</div>
          <div className={classes['article-preview__date-of-creation']}>{creationDate}</div>
        </div>
        <img src={image || avatar} alt="Author avatar" className={classes['article-preview__author-avatar']} />
      </section>
    </li>
  );
};

export default ArticlePreview;
