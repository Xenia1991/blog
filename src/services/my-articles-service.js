export const createArticle = async (articleInfo, rejected) => {
  try {
    const article = {
      article: {
        title: articleInfo.title,
        description: articleInfo.description,
        body: articleInfo.body,
        tagList: articleInfo.tagList,
      },
    };
    const createArticleRequest = await fetch('https://blog-platform.kata.academy/api/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Token ${articleInfo.token}` },
      body: JSON.stringify(article),
    });
    if (!createArticleRequest.ok) {
      throw new Error('error in createArticleRequest');
    }
    const successCreation = createArticleRequest.json();
    return successCreation;
  } catch (error) {
    return rejected(error);
  }
};
