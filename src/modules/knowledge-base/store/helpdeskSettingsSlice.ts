// store/helpdeskSettingsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchHelpdeskSettings } from '@/modules/knowledge-base/api/knowledgebase.api';
import { HelpdeskSettingsQuery } from '@/relay/__generated__/HelpdeskSettingsQuery.graphql';

type State = {
  data: HelpdeskSettingsQuery['response']['helpdeskSettings'] | null;
  loading: boolean;
  error: string | null;
};

const initialState: State = {
  data: null,
  loading: false,
  error: null,
};

export const getHelpdeskSettings = createAsyncThunk(
  'helpdeskSettings/fetch',
  async () => {
    return await fetchHelpdeskSettings();
  }
);

const helpdeskSettingsSlice = createSlice({
  name: 'helpdeskSettings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHelpdeskSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHelpdeskSettings.fulfilled, (state, action) => {
        state.data = action.payload as any;
        state.loading = false;
      })
      .addCase(getHelpdeskSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch settings';
      });
  },
});

export default helpdeskSettingsSlice.reducer;
