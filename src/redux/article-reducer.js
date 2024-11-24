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
    isError: false,
    page: 0,
  },
  reducers: {
    changePage: (state, action) => {
      state.page = action.payload;
    },
  },
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
        state.isError = false;
      })
      .addCase(fetchArticlesThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(fetchArticleThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchArticleThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.article = action.payload.article;
      })
      .addCase(fetchArticleThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const getArticlesReducer = articlesReducerSlice.reducer;
