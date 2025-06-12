import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllHelpdeskCategories } from '@/modules/knowledge-base/api/knowledgebase.api';
import { HelpdeskCategory } from '@/modules/knowledge-base/interface';

interface HelpdeskCategoryState {
  categories: HelpdeskCategory[];
  loading: boolean;
  error: string | null;
}

const initialState: HelpdeskCategoryState = {
  categories: [],
  loading: false,
  error: null,
};

// Async thunk to fetch categories
export const fetchHelpdeskCategories = createAsyncThunk(
  'helpdesk/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllHelpdeskCategories();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error fetching categories');
    }
  }
);

// Slice
const helpdeskCategorySlice = createSlice({
  name: 'helpdesk',
  initialState,
  reducers: {
    clearCategories(state) {
      state.categories = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHelpdeskCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHelpdeskCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchHelpdeskCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCategories } = helpdeskCategorySlice.actions;

export default helpdeskCategorySlice.reducer;
