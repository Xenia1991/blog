const getSingleArticle = async (info, rejectedWithValue) => {
  try {
    const articleResponse = await fetch(`https://blog-platform.kata.academy/api/articles/${info.slug}`, {
      method: 'GET',
      headers: { Authorization: `Token ${info.token}` },
    });
    if (!articleResponse.ok) {
      throw new Error('ошибка запроса статьи');
    }
    const article = await articleResponse.json();
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
