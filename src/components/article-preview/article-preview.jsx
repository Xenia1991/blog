import { Typography } from 'antd';
import { nanoid } from 'nanoid';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

import classes from './article-preview.module.scss';
import avatar from './avatar.png';

const ArticlePreview = ({ article }) => {
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

  const { Text } = Typography;

  const tags = article.tagList.map((tag) => (
    <Text code key={nanoid()}>
      {tag}
    </Text>
  ));
  const creationDate = format(new Date(article.createdAt), 'MMMM dd, yyyy');
  const { image, username } = article.author;
  const title = cutTitle(article.title);
  const description = cuttedDescription(article.description);
  console.log(article);

  return (
    <li className={classes['article-preview']}>
      <section className={classes['article-preview__text-section']}>
        <div className={classes['article-preview__header']}>
          <Link to={`/articles/${article.slug}`} className={classes['article-preview__title']}>
            {title}
          </Link>
          <button type="submit" className={classes['article-preview__likes-section']}>
            <span className={classes['article-preview__like']} />
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
