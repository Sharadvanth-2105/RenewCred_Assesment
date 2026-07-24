import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

export const fetchPublicPages = createAsyncThunk(
  'content/fetchPublicPages',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/content/pages');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch pages');
    }
  }
);

export const fetchPageBySlug = createAsyncThunk(
  'content/fetchPageBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await api.get(`/content/pages/slug/${slug}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Page not found');
    }
  }
);

const contentSlice = createSlice({
  name: 'content',
  initialState: {
    pages: [],
    currentPage: null,
    loading: false,
    error: null
  },
  reducers: {
    clearCurrentPage: (state) => {
      state.currentPage = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPublicPages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPublicPages.fulfilled, (state, action) => {
        state.loading = false;
        state.pages = action.payload;
      })
      .addCase(fetchPublicPages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPageBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPageBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPage = action.payload;
      })
      .addCase(fetchPageBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearCurrentPage } = contentSlice.actions;
export default contentSlice.reducer;
