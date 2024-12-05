import { apiBase } from './account-service';

export const createArticle = async (info, rejected) => {
  try {
    const article = {
      article: {
        title: info.title,
        description: info.description,
        body: info.body,
        tagList: info.tagList,
      },
    };
    const createArticleRequest = await fetch(`${apiBase}/articles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Token ${info.token}` },
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

export const editArticle = async (info, rejected) => {
  try {
    const article = {
      article: {
        title: info.title,
        description: info.description,
        body: info.body,
        tagList: info.tagList,
      },
    };
    const editRequest = await fetch(`${apiBase}/articles/${info.slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Token ${info.token}` },
      body: JSON.stringify(article),
    });
    if (!editRequest.ok) {
      throw new Error('error in editArticleRequest');
    }
    const successEditing = await editRequest.json();
    return successEditing;
  } catch (error) {
    return rejected(error);
  }
};

export const deleteArticle = async (info, rejected) => {
  try {
    const deleteRequest = await fetch(`${apiBase}/articles/${info.slug}`, {
      method: 'DELETE',
      headers: { Authorization: `Token ${info.token}` },
    });
    if (!deleteRequest.ok) {
      throw new Error('error in deleteArticleRequest');
    }
    const successDelete = await deleteRequest.json();
    return successDelete;
  } catch (error) {
    return rejected(error);
  }
};
