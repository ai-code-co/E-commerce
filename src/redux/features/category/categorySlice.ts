// src/redux/features/category/categorySlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api  from '../../../services/api';

export interface CategoryState {
  list: string[];
  selectedCategory: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CategoryState = {
  list: [],
  selectedCategory: null,
  status: 'idle',
  error: null,
};

// Async Thunk to fetch all unique categories from DummyJSON
export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async () => {
    const response = await api.get('/products/category-list');
    return response.data; // Returns an array of strings e.g., ["beauty", "fragrances", "furniture"]
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    selectCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    clearCategory: (state) => {
      state.selectedCategory = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch categories';
      });
  },
});

export const { selectCategory, clearCategory } = categorySlice.actions;
export default categorySlice.reducer;