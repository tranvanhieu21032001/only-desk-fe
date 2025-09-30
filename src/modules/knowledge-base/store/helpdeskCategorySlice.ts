import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllHelpdeskCategories } from '@/modules/knowledge-base/api/knowledgebase.api';
import { HelpdeskCategory } from '@/modules/knowledge-base/interface';
import webLocalStorage from '@/shared/utils/webLocalStorage';
import { constants } from '@/core/settings';

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
      console.log("loading.....");
      
      const response = await getAllHelpdeskCategories();
      webLocalStorage.set(constants.KNOWLEGE_BASE_DATA, response);
      return response;
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
      webLocalStorage.set(constants.KNOWLEGE_BASE_DATA, []);
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
      webLocalStorage.set(constants.KNOWLEGE_BASE_DATA, state.categories);
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
      webLocalStorage.set(constants.KNOWLEGE_BASE_DATA, state.categories);
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
        state.categories = action.payload as unknown as HelpdeskCategory[];
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
