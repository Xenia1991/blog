import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import getArticles from '../services/articles-list-service';

export const fetchArticlesThunk = createAsyncThunk('articles/fetchArticles', async (offset, { rejectWithValue }) => {
  return getArticles(offset, rejectWithValue);
});

export const articlesReducerSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    isLoading: false,
    articlesCount: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchArticlesThunk.fulfilled, (state, action) => {
        state.articles = action.payload.articles;
        state.articlesCount = action.payload.articlesCount;
        state.isLoading = false;
      })
      .addCase(fetchArticlesThunk.rejected, (state) => {
        state.error = 'response error';
      });
  },
});

export const getArticlesReducer = articlesReducerSlice.reducer;
