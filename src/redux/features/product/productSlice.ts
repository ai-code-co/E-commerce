import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import api from '../../../services/api'; // The Axios instance we made earlier!

// 1. Define how a Product looks based on DummyJSON API
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

// 2. Define our State
export interface ProductState {
  items: Product[];
  selectedProduct: Product | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  selectedProduct: null,
  status: 'idle',
  error: null,
};

// 👈 2. Async Thunk to fetch a single product details profile
export const fetchProductById = createAsyncThunk(
  'product/fetchProductById',
  async (id: string | number) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  }
);

// 3. Create the Async Thunk to fetch data
export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async () => {
    // DummyJSON returns an object with a 'products' array
    const response = await api.get('/products?limit=20'); 
    return response.data.products;
  }
);

// 4. Create the Slice to handle the different states of our API call
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // Quick cleanup reducer when navigating away from details page
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.items = action.payload; // Store the fetched products!
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      })
      // 👈 3. Single Product Lifecycle Reducers
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to load product details';
      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;