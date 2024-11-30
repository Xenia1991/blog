import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { createArticle } from '../services/my-articles-service';

export const createArticleThunk = createAsyncThunk(
  'myArticle/createArticleFetch',
  async (article, { rejectWithValue }) => {
    return createArticle(article, rejectWithValue);
  }
);

const createArticleSlice = createSlice({
  name: 'myArticle',
  initialState: {
    article: null,
    isCreatingLoading: null,
    isCreatingError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createArticleThunk.pending, (state, action) => {
        state.isCreatingLoading = true;
        state.isCreatingError = false;
        state.article = null;
      })
      .addCase(createArticleThunk.fulfilled, (state, action) => {
        state.isCreatingLoading = false;
        state.isCreatingError = false;
        state.article = action.payload;
      })
      .addCase(createArticleThunk.rejected, (state, action) => {
        state.isCreatingLoading = false;
        state.isCreatingError = true;
      });
  },
});

export const createArticleReducer = createArticleSlice.reducer;
