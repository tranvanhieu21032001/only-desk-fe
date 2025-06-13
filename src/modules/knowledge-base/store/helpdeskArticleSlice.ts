import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllHelpdeskArticles } from '@/modules/knowledge-base/api/knowledgebase.api';
import {
    HelpdeskArticle,
    HelpdeskArticleListResponse,
} from '@/modules/knowledge-base/interface';

interface HelpdeskArticleState {
    items: HelpdeskArticle[];
    total: number;
    page: number;
    limit: number;
    loading: boolean;
    error: string | null;
}

const initialState: HelpdeskArticleState = {
    items: [],
    total: 0,
    page: 1,
    limit: 10,
    loading: false,
    error: null,
};

export const fetchHelpdeskArticles = createAsyncThunk<
  HelpdeskArticleListResponse,
  { page?: number; limit?: number; status?: string; lang?: string } | undefined,
  { rejectValue: string }
>('helpdesk/fetchArticles', async (params, { rejectWithValue }) => {
  try {
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const status = params?.status || '';
    const lang = params?.lang || 'en';
    const response = await getAllHelpdeskArticles(page, limit, status, lang);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to fetch helpdesk articles');
  }
});


const helpdeskArticleSlice = createSlice({
    name: 'helpdeskArticles',
    initialState,
    reducers: {
        clearArticles(state) {
            state.items = [];
            state.total = 0;
            state.page = 1;
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
                state.items = action.payload.data;
                state.total = action.payload.total;
                state.page = action.payload.page;
            })
            .addCase(fetchHelpdeskArticles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'Unknown error';
            });
    },
});

export const { clearArticles } = helpdeskArticleSlice.actions;

export default helpdeskArticleSlice.reducer;
