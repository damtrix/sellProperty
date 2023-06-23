import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = 'http://127.0.0.1:8000/api/v1/users';

export const loginUser = createAsyncThunk(
  'login',
  async (obj, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/login`, obj, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return data;
    } catch (error) {
      rejectWithValue(error.response);
    }
  }
);

export const signupUser = createAsyncThunk(
  'signup',
  async (obj, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/signup`, obj, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(data);
      return data;
    } catch (error) {
      rejectWithValue(error.response);
    }
  }
);

export const logoutUser = createAsyncThunk('logout', async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/logout`);
    return data;
  } catch (error) {
    console.log(error);
  }
});

const INITIAL_STATE = {
  currentUser: null,
  loading: false,
  isSuccess: false,
  message: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: {
    [loginUser.pending]: (state, action) => {
      state.loading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.isSuccess = true;
      state.loading = false;
      state.currentUser = payload;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isSuccess = false;
      state.loading = false;
      state.message = 'failed';
    },
    [signupUser.pending]: (state, action) => {
      state.loading = true;
    },
    [signupUser.fulfilled]: (state, { payload }) => {
      state.isSuccess = true;
      state.loading = false;
      state.currentUser = payload;
    },
    [signupUser.rejected]: (state, { payload }) => {
      state.isSuccess = false;
      state.loading = false;
      state.message = 'failed';
    },
    [logoutUser.pending]: (state, action) => {
      state.loading = true;
    },
    [logoutUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.isSuccess = true;
      state.currentUser = null;
    },
    [logoutUser.rejected]: (state, action) => {
      state.isSuccess = false;
      state.loading = false;
      state.message = 'failed';
    },
  },
});

export const { setCurrentUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
