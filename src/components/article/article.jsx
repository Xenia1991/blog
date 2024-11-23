import { nanoid } from 'nanoid';
import { Typography } from 'antd';
import { format } from 'date-fns';

import classes from './article.module.scss';
import avatar from './avatar.png';

const Article = () => {
  const article = {
    slug: 'luchshie-citaty-dzhonni-silverhenda-sq8xjx',
    title: 'Лучшие Цитаты Джонни Сильверхенда',
    description: 'В этом посте собрал лучшие цитаты Джонни Сильверхенда',
    body: '1. - Единственная разница между хорошим и плохим днём - это твоё отношение к нему.\n\n2. - Если тебе',
    createdAt: '2024-11-17T17:48:21.930Z',
    updatedAt: '2024-11-21T21:38:00.619Z',
    tagList: ['cyberpunk 2077', 'Silverhand'],
    favorited: false,
    favoritesCount: 4,
    author: {
      username: 'silverhand',
      image: 'https://i.pinimg.com/736x/20/ce/76/20ce76a25921ffa092d6fd6e57fa33f5.jpg',
      following: false,
    },
  };
  const { Text } = Typography;
  const tags = article.tagList.map((tag) => (
    <Text code key={nanoid()}>
      {tag}
    </Text>
  ));
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
