import { Typography } from 'antd';
import { nanoid } from 'nanoid';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchArticleThunk, fetchFavoriteThunk, fetchUnfavoriteThunk } from '../../redux/article-reducer';
import avatar from '../../assets/images/avatar.png';
import heart from '../../assets/images/heart.png';
import favorite from '../../assets/images/favourite.png';

import classes from './article-preview.module.scss';

const ArticlePreview = ({ article }) => {
  const user = useSelector((state) => state.account.user);
  const { slug } = article;
  let token;
  const dispatch = useDispatch();

  if (user) {
    token = user.token;
  }

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
    dispatch(fetchArticleThunk(slug));
  };

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
  const { image, username } = article.author;
  const title = cutTitle(article.title);
  const description = cuttedDescription(article.description);

  return (
    <li className={classes['article-preview']}>
      <section className={classes['article-preview__text-section']}>
        <div className={classes['article-preview__header']}>
          <Link to={`/articles/${slug}`} className={classes['article-preview__title']} onClick={handleClick}>
            {title}
          </Link>
          <button
            type="button"
            className={classes['article-preview__likes-section']}
            onClick={article.favorited ? handleUnfavorite : handleFavorite}
          >
            <img src={article.favorited ? favorite : heart} className={classes['article-preview__like']} alt="like" />
            <span className={classes['article-preview__count']}>{article.favoritesCount}</span>
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
