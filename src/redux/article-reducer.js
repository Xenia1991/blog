import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getArticles, markFavorite, markUnfavorite } from '../services/articles-list-service';
import getSingleArticle from '../services/article-service';

export const fetchArticlesThunk = createAsyncThunk('articles/fetchArticles', async (info, { rejectWithValue }) => {
  return getArticles(info, rejectWithValue);
});

export const fetchArticleThunk = createAsyncThunk('article/fetchArticle', async (info, { rejectWithValue }) => {
  return getSingleArticle(info, rejectWithValue);
});

export const fetchFavoriteThunk = createAsyncThunk('article/fetchFavourite', async (info, { rejectWithValue }) => {
  return markFavorite(info, rejectWithValue);
});

export const fetchUnfavoriteThunk = createAsyncThunk('article/fetchUnfavourite', async (info, { rejectWithValue }) => {
  return markUnfavorite(info, rejectWithValue);
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
    isLoadingFavorite: null,
    isErrorFavorite: null,
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
      })
      .addCase(fetchFavoriteThunk.pending, (state, action) => {
        state.isLoadingFavorite = true;
      })
      .addCase(fetchFavoriteThunk.fulfilled, (state, action) => {
        state.isLoadingFavorite = false;
        const index = state.articles.findIndex((article) => article.slug === action.payload.article.slug);
        state.articles = [
          ...state.articles.slice(0, index),
          action.payload.article,
          ...state.articles.slice(index + 1),
        ];
        state.article = action.payload.article;
      })
      .addCase(fetchFavoriteThunk.rejected, (state, action) => {
        state.isErrorFavorite = true;
      })
      .addCase(fetchUnfavoriteThunk.pending, (state, action) => {
        state.isLoadingFavorite = true;
      })
      .addCase(fetchUnfavoriteThunk.fulfilled, (state, action) => {
        state.isLoadingFavorite = false;
        const index = state.articles.findIndex((article) => article.slug === action.payload.article.slug);
        state.articles = [
          ...state.articles.slice(0, index),
          action.payload.article,
          ...state.articles.slice(index + 1),
        ];
        state.article = action.payload.article;
      })
      .addCase(fetchUnfavoriteThunk.rejected, (state, action) => {
        state.isErrorFavorite = true;
      });
  },
});

export const getArticlesReducer = articlesReducerSlice.reducer;
