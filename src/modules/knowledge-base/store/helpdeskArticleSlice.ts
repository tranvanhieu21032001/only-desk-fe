import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllArticles } from "@/modules/knowledge-base/api/knowledgebase.api";
import { HelpdeskArticle } from "@/modules/knowledge-base/interface";
import { RootState } from "@/core/store";

// -------------------- STATE --------------------
export interface HelpdeskArticleState {
  items: HelpdeskArticle[];
  loading: boolean;
  error: string | null;
}

const initialState: HelpdeskArticleState = {
  items: [],
  loading: false,
  error: null,
};

// -------------------- ASYNC THUNK --------------------
export const fetchHelpdeskArticles = createAsyncThunk<
  HelpdeskArticle[],
  { keyword?: string } | undefined,
  { rejectValue: string }
>("helpdesk/fetchArticles", async (params, { rejectWithValue }) => {
  try {
    const keyword = params?.keyword ?? "";
    return await getAllArticles(keyword);
  } catch (error: any) {
    return rejectWithValue(
      error.message || "Failed to fetch helpdesk articles"
    );
  }
});

// -------------------- SLICE --------------------
const helpdeskArticleSlice = createSlice({
  name: "helpdeskArticles",
  initialState,
  reducers: {
    clearArticles(state) {
      state.items = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHelpdeskArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHelpdeskArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchHelpdeskArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      });
  },
});

// -------------------- SELECTORS --------------------
export const selectArticles = (state: RootState) =>
  state.helpdeskArticles.items;

export const selectArticlesLoading = (state: RootState) =>
  state.helpdeskArticles.loading;

export const selectArticlesError = (state: RootState) =>
  state.helpdeskArticles.error;

// -------------------- EXPORT --------------------
export const { clearArticles } = helpdeskArticleSlice.actions;
export default helpdeskArticleSlice.reducer;
