import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { Typography } from 'antd';
import { format } from 'date-fns';

import { fetchArticleThunk } from '../../redux/article-reducer';

import classes from './article.module.scss';
import avatar from './avatar.png';

const Article = () => {
  const article = useSelector((state) => state.articles.article);
  const isLoading = useSelector((state) => state.articles.isLoading);

  if (!article || isLoading) {
    return <div>Загружаем...</div>;
  }

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
            <button type="submit" className={classes['article__likes-section']}>
              <span className={classes['article__like']} />
              <span className={classes['article__count']}>{article.favoritesCount}</span>
            </button>
          </div>
          <div className={classes['article__tags-section']}>{tags}</div>
          <div className={classes['article__article-text']}>{article.description}</div>
        </section>
        <section className={classes['article__author-section']}>
          <div className={classes['article__name-date-section']}>
            <div className={classes['article__author-name']}>{article.author.username}</div>
            <div className={classes['article__date-of-creation']}>{creationDate}</div>
          </div>
          <img src={article.author.image || avatar} alt="Author avatar" className={classes['article__author-avatar']} />
        </section>
      </div>
      <div className={classes['article-body']}>{article.body}</div>
    </section>
  );
};

export default Article;
