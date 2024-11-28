import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { createAccount, enterAccount } from '../services/account-service';

export const createAccountThunk = createAsyncThunk('account/createAccountFetch', async (user, { rejectWithValue }) => {
  return createAccount(user, rejectWithValue);
});

export const enterAccountThunk = createAsyncThunk('account/enterAccountFetch', async (user, { rejectWithValue }) => {
  return enterAccount(user, rejectWithValue);
});

export const accountReducerSlice = createSlice({
  name: 'account',
  initialState: {
    token: null,
    user: null,
    isCreatingError: false,
    isCreatingLoader: false,
    isEnteringError: false,
    isEnteringLoader: false,
  },
  reducers: {
    logOut(state, action) {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAccountThunk.pending, (state, action) => {
        state.isCreatingLoader = true;
      })
      .addCase(createAccountThunk.fulfilled, (state, action) => {
        state.isCreatingLoader = false;
        state.isCreatingError = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(createAccountThunk.rejected, (state, action) => {
        state.isCreatingError = true;
        state.isCreatingLoader = false;
      })
      .addCase(enterAccountThunk.pending, (state, action) => {
        state.isEnteringLoader = true;
      })
      .addCase(enterAccountThunk.fulfilled, (state, action) => {
        state.isEnteringLoader = false;
        state.isEnteringError = false;
        state.token = action.payload.user.token;
        state.user = action.payload.user;
      })
      .addCase(enterAccountThunk.rejected, (state, action) => {
        state.isEnteringError = true;
        state.isEnteringLoader = false;
      });
  },
});

export const accountReducer = accountReducerSlice.reducer;
