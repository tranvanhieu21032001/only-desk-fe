import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllArticles } from "@/modules/knowledge-base/api/knowledgebase.api";
import { HelpdeskArticle } from "@/modules/knowledge-base/interface";
import { RootState } from "@/core/store";
import { PAGE_SIZE } from "@/shared/constant/common";

// -------------------- STATE --------------------
export interface HelpdeskArticleState {
  items: HelpdeskArticle[];
  loading: boolean;
  error: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

const initialState: HelpdeskArticleState = {
  items: [],
  loading: false,
  error: null,
  endCursor: null,
  hasNextPage: true,
};

// -------------------- ASYNC THUNK --------------------
export const fetchHelpdeskArticles = createAsyncThunk<
  { articles: HelpdeskArticle[], endCursor: string | null, hasNextPage: boolean },
  { keyword?: string; after?: string | null } | undefined,
  { rejectValue: string; state: RootState }
>(
  "helpdesk/fetchArticles",
  async (params = {}, { rejectWithValue }) => {
    try {
      const { keyword, after } = params;
      const res = await getAllArticles({ first: PAGE_SIZE, keyword, after });

      const articles = res?.edges?.map((edge: any) => edge?.node as HelpdeskArticle) ?? [];

      return {
        articles,
        endCursor: res?.pageInfo?.endCursor || null,
        hasNextPage: res?.pageInfo?.hasNextPage || false,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.message || "Failed to fetch helpdesk articles"
      );
    }
  }
);

// -------------------- SLICE --------------------
const helpdeskArticleSlice = createSlice({
  name: "helpdeskArticles",
  initialState,
  reducers: {
    resetArticles(state) {
      state.items = [];
      state.loading = false;
      state.error = null;
      state.endCursor = null;
      state.hasNextPage = true;
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

        const isInitialFetch = !action.meta.arg?.after;

        if (isInitialFetch) {
          state.items = action.payload.articles;
        } else {
          state.items.push(...action.payload.articles);
        }

        state.endCursor = action.payload.endCursor;
        state.hasNextPage = action.payload.hasNextPage;
      })
      .addCase(fetchHelpdeskArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      });
  },
});

// -------------------- SELECTORS --------------------
export const selectArticles = (state: RootState) => state.helpdeskArticles.items;
export const selectArticlesLoading = (state: RootState) => state.helpdeskArticles.loading;
export const selectArticlesError = (state: RootState) => state.helpdeskArticles.error;
export const selectArticlesHasNextPage = (state: RootState) => state.helpdeskArticles.hasNextPage;
export const selectArticlesEndCursor = (state: RootState) => state.helpdeskArticles.endCursor;

// -------------------- EXPORT --------------------
export const { resetArticles } = helpdeskArticleSlice.actions;
export default helpdeskArticleSlice.reducer;