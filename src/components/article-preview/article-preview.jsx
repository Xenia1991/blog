import { Typography } from 'antd';
import { nanoid } from 'nanoid';
import { format } from 'date-fns';

import classes from './article-preview.module.scss';
import avatar from './avatar.png';

const ArticlePreview = () => {
  const { Text } = Typography;
  const article = {
    body: 'It takes a Jacobian',
    slug: 'how-to-train-your-dragon',
    tags: ['dragons', 'training'],
    title: 'How to train your dragon',
    author: {
      bio: 'I work at State Farm.',
      image: 'https://i.stack.imgur.com/xHWG8.jpg',
      username: 'jake',
      following: false,
    },
    createdAt: '2021-02-18T03:22:56.637Z',
    favorited: false,
    updatedAt: '2021-02-18T03:48:35.824Z',
    description:
      // eslint-disable-next-line max-len
      'Ever wonder how? Lorem ipsum frftyuilkjhgfdertyuiolkjhgfdxcvbnjkl;iuytresxcfghjkl,mnbvcxdsrtyujk ertyuiokjhgfdewrtyuiokjhngbfewrtyuhiojlkjhgfdwqerdtyguhijkljmhgfdswertyuioplkjnbvfc',
    favoritesCount: 12,
  };
  const tags = article.tags.map((tag) => (
    <Text code key={nanoid()}>
      {tag}
    </Text>
  ));
  const creationDate = format(new Date(article.createdAt), 'MMMM dd, yyyy');
  return (
    <li className={classes['article-preview']}>
      <section className={classes['article-preview__text-section']}>
        <div className={classes['article-preview__header']}>
          <h5 className={classes['article-preview__title']}>{article.title}</h5>
          <div className={classes['article-preview__likes-section']}>
            <span className={classes['article-preview__like']}>&#9825;</span>
            <span className={classes['article-preview__count']}>{article.favoritesCount}</span>
          </div>
        </div>
        <div className={classes['article-preview__tags-section']}>{tags}</div>
        <div className={classes['article-preview__article-text']}>{article.description}</div>
      </section>
      <section className={classes['article-preview__author-section']}>
        <div className={classes['article-preview__name-date-section']}>
          <div className={classes['article-preview__author-name']}>{article.author.username}</div>
          <div className={classes['article-preview__date-of-creation']}>{creationDate}</div>
        </div>
        <img src={avatar} alt="Author avatar" className={classes['article-preview__author-avatar']} />
      </section>
    </li>
  );
};

export default ArticlePreview;
