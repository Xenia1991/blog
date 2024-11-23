import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import getArticles from '../services/articles-list-service';
import getSingleArticle from '../services/article-service';

export const fetchArticlesThunk = createAsyncThunk('articles/fetchArticles', async (offset, { rejectWithValue }) => {
  return getArticles(offset, rejectWithValue);
});

export const fetchArticleThunk = createAsyncThunk('article/fetchArticle', async (slug, { rejectWithValue }) => {
  return getSingleArticle(slug, rejectWithValue);
});

export const articlesReducerSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    article: null,
    isLoading: false,
    articlesCount: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesThunk.pending, (state) => {
        state.article = null;
        state.isLoading = true;
      })
      .addCase(fetchArticlesThunk.fulfilled, (state, action) => {
        state.articles = action.payload.articles;
        state.articlesCount = action.payload.articlesCount;
        state.isLoading = false;
      })
      .addCase(fetchArticlesThunk.rejected, (state) => {
        state.isLoading = false;
        state.error = 'articles response error';
      })
      .addCase(fetchArticleThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchArticleThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.article = action.payload.article;
      })
      .addCase(fetchArticleThunk.rejected, (state) => {
        state.isLoading = false;
        state.error = 'article response error';
      });
  },
});

export const getArticlesReducer = articlesReducerSlice.reducer;
