import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllHelpdeskCategories } from '@/modules/knowledge-base/api/knowledgebase.api';
import { HelpdeskCategory } from '@/modules/knowledge-base/interface';
import { HelpdeskCache } from '@/shared/utils/helpdesk-cache';

interface HelpdeskCategoryState {
  categories: HelpdeskCategory[];
  loading: boolean;
  error: string | null;
}

export const initialState: HelpdeskCategoryState = {
  categories: [],
  loading: false,
  error: null,
};

export const fetchHelpdeskCategories = createAsyncThunk(
  'helpdesk/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const cached = HelpdeskCache.get();
      if (cached) {
        return [...cached];
      }
      const response = await getAllHelpdeskCategories();
      const mutableResponse: HelpdeskCategory[] = JSON.parse(JSON.stringify(response));

      HelpdeskCache.set(mutableResponse);
      return mutableResponse;

    } catch (error: any) {
      return rejectWithValue(error.message || 'Error fetching categories');
    }
  },
);

const helpdeskCategorySlice = createSlice({
  name: 'helpdesk',
  initialState,
  reducers: {
    clearCategories(state) {
      state.categories = [];
      state.loading = false;
      state.error = null;
      HelpdeskCache.delete();
    },
    removeArticle(state, action) {
      const rawId = action.payload;
      state.categories.forEach((category) => {
        category.articles = category.articles?.filter(
          (a) => (a as any).rawId !== rawId,
        );

        category.sections?.forEach((section) => {
          section.articles = section.articles?.filter(
            (a) => (a as any).rawId !== rawId,
          );
        });
      });
      HelpdeskCache.set(state.categories);
    },
    updateArticle(state, action) {
      const updated = action.payload;
      state.categories.forEach((category) => {
        category.articles = category.articles?.map((a) =>
          (a as any).rawId === updated.rawId
            ? { ...(a as any), ...updated }
            : a,
        );

        category.sections?.forEach((section) => {
          section.articles = section.articles?.map((a) =>
            (a as any).rawId === updated.rawId
              ? { ...(a as any), ...updated }
              : a,
          );
        });
      });
      HelpdeskCache.set(state.categories);
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
        state.categories = action.payload as HelpdeskCategory[];
      })
      .addCase(fetchHelpdeskCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCategories, removeArticle, updateArticle } =
  helpdeskCategorySlice.actions;

export default helpdeskCategorySlice.reducer;
