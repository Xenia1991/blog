import { apiBase } from './account-service';

const getSingleArticle = async (info, rejectedWithValue) => {
  try {
    const articleRequest = await fetch(`${apiBase}/articles/${info.slug}`, {
      method: 'GET',
      headers: { Authorization: `Token ${info.token}` },
    });
    if (!articleRequest.ok) {
      throw new Error('ошибка запроса статьи');
    }
    const article = await articleRequest.json();
    return article;
  } catch (error) {
    if (error.status === 404) {
      getSingleArticle(info, rejectedWithValue);
    }
    return rejectedWithValue({
      message: error.message,
      stack: error.stack,
    });
  }
};

export default getSingleArticle;
