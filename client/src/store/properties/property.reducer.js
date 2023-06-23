import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/v1';

export const propertiesData = createAsyncThunk(
  'propertiesData',
  async (obj, { getState, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/products`);
      return data.data;
    } catch (error) {
      rejectWithValue(error.response);
    }
  }
);

export const INITIAL_STATE = {
  properties: [],
  loading: false,
  isSuccess: false,
  isMessage: '',
};

export const propertiesSlice = createSlice({
  name: 'property',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: {
    [propertiesData.pending]: (state, action) => {
      state.loading = true;
    },
    [propertiesData.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.properties = payload;
      state.isSuccess = true;
    },
    [propertiesData.rejected]: (state, action) => {
      state.loading = false;
      state.isMessage = 'Failed';
    },
  },
});

export const propertiesReducer = propertiesSlice.reducer;
