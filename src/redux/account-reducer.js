import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { createAccount } from '../services/account-service';

export const createAccountThunk = createAsyncThunk('account/createAccountFetch', async (user, { rejectWithValue }) => {
  return createAccount(user, rejectWithValue);
});

export const accountReducerSlice = createSlice({
  name: 'account',
  initialState: {
    token: null,
    user: null,
    isCreatingError: false,
    isCreatingLoader: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAccountThunk.pending, (state, action) => {
        state.isCreatingLoader = true;
      })
      .addCase(createAccountThunk.fulfilled, (state, action) => {
        state.isCreatingLoader = false;
        state.isCreatingError = false;
        state.token = action.payload.token;
        state.user = action.payload;
      })
      .addCase(createAccountThunk.rejected, (state, action) => {
        state.isCreatingError = true;
        state.isCreatingLoader = false;
      });
  },
});

export const accountReducer = accountReducerSlice.reducer;
