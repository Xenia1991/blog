export const getArticles = async (info, rejectWithValue) => {
  try {
    const responseArticles = await fetch(
      `https://blog-platform.kata.academy/api/articles?offset=${info.offset}&&limit=5`,
      {
        method: 'GET',
        headers: { Authorization: `Token ${info.token}` },
      }
    );
    if (!responseArticles.ok) {
      throw new Error('The error of response');
    }
    const articles = await responseArticles.json();
    return articles;
  } catch (error) {
    return rejectWithValue(error);
  }
};

export const markFavorite = async (info, rejectWithValue) => {
  try {
    const requestFavorite = await fetch(`https://blog-platform.kata.academy/api/articles/${info.slug}/favorite`, {
      method: 'POST',
      headers: { Authorization: `Token ${info.token}` },
    });
    if (!requestFavorite.ok) {
      throw new Error('The error of requestFavorite');
    }
    const successFavorite = await requestFavorite.json();
    return successFavorite;
  } catch (error) {
    return rejectWithValue(error);
  }
};

export const markUnfavorite = async (info, rejectWithValue) => {
  try {
    const requestUnfavorite = await fetch(`https://blog-platform.kata.academy/api/articles/${info.slug}/favorite`, {
      method: 'DELETE',
      headers: { Authorization: `Token ${info.token}` },
    });
    if (!requestUnfavorite.ok) {
      throw new Error('The error of requestFavorite');
    }
    const successUnfavorite = await requestUnfavorite.json();
    return successUnfavorite;
  } catch (error) {
    return rejectWithValue(error);
  }
};
