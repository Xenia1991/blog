import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { createArticle, editArticle, deleteArticle } from '../services/my-articles-service';

export const createArticleThunk = createAsyncThunk(
  'myArticle/createArticleFetch',
  async (article, { rejectWithValue }) => {
    return createArticle(article, rejectWithValue);
  }
);

export const editArticleThunk = createAsyncThunk('myArticle/editArticleFetch', async (article, { rejectWithValue }) => {
  return editArticle(article, rejectWithValue);
});

export const deleteArticleThunk = createAsyncThunk('myArticleDelete/deleteFetch', async (info, { rejectWithValue }) => {
  return deleteArticle(info, rejectWithValue);
});

const createArticleSlice = createSlice({
  name: 'myArticle',
  initialState: {
    article: null,
    isCreatingLoading: null,
    isCreatingError: null,
    isEditingLoading: null,
    isEditingError: null,
    isDeleteLoading: null,
    isDeleted: null,
    isDeleteError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createArticleThunk.pending, (state) => {
        state.isCreatingLoading = true;
        state.isCreatingError = false;
        state.article = null;
      })
      .addCase(createArticleThunk.fulfilled, (state, action) => {
        state.isCreatingLoading = false;
        state.isCreatingError = false;
        state.article = action.payload;
      })
      .addCase(createArticleThunk.rejected, (state) => {
        state.isCreatingLoading = false;
        state.isEditingError = null;
        state.isCreatingError = true;
      })
      .addCase(editArticleThunk.pending, (state) => {
        state.isEditingLoading = true;
        state.article = null;
      })
      .addCase(editArticleThunk.fulfilled, (state, action) => {
        state.isEditingLoading = false;
        state.isEditingError = false;
        state.article = action.payload;
      })
      .addCase(editArticleThunk.rejected, (state) => {
        state.isEditingError = true;
      })
      .addCase(deleteArticleThunk.pending, (state) => {
        state.isDeleteLoading = true;
      })
      .addCase(deleteArticleThunk.fulfilled, (state) => {
        state.isDeleteLoading = false;
        state.isDeleted = true;
      })
      .addCase(deleteArticleThunk.rejected, (state) => {
        state.isDeleteError = true;
      });
  },
});

export const createArticleReducer = createArticleSlice.reducer;
