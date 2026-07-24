import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

export const fetchPages = createAsyncThunk(
  'content/fetchPages',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/content/pages');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch pages');
    }
  }
);

export const fetchPageById = createAsyncThunk(
  'content/fetchPageById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/content/pages/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch page');
    }
  }
);

export const savePage = createAsyncThunk(
  'content/savePage',
  async ({ id, pageData }, { rejectWithValue }) => {
    try {
      if (id) {
        const response = await api.put(`/content/pages/${id}`, pageData);
        return response.data.data;
      } else {
        const response = await api.post('/content/pages', pageData);
        return response.data.data;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to save page');
    }
  }
);

export const deletePage = createAsyncThunk(
  'content/deletePage',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/content/pages/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete page');
    }
  }
);

const contentSlice = createSlice({
  name: 'content',
  initialState: {
    pages: [],
    currentPage: null,
    loading: false,
    error: null,
    successMessage: null
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    clearCurrentPage: (state) => {
      state.currentPage = null;
    },
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPages.fulfilled, (state, action) => {
        state.loading = false;
        state.pages = action.payload;
      })
      .addCase(fetchPages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPageById.fulfilled, (state, action) => {
        state.currentPage = action.payload;
      })
      .addCase(savePage.pending, (state) => {
        state.loading = true;
      })
      .addCase(savePage.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = 'Page saved successfully!';
        const index = state.pages.findIndex(p => p._id === action.payload._id);
        if (index !== -1) {
          state.pages[index] = action.payload;
        } else {
          state.pages.unshift(action.payload);
        }
        state.currentPage = action.payload;
      })
      .addCase(savePage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePage.fulfilled, (state, action) => {
        state.pages = state.pages.filter(p => p._id !== action.payload);
        state.successMessage = 'Page deleted successfully!';
      });
  }
});

export const { setCurrentPage, clearCurrentPage, clearMessages } = contentSlice.actions;
export default contentSlice.reducer;
