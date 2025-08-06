import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchQuery } from 'react-relay';

import relayEnvironment from '@/relay/RelayEnvironment';
import { helpdeskSettingsQuery } from '@/relay/HelpdeskSettingsQuery';
import { HelpdeskSettingsQuery } from '@/relay/__generated__/HelpdeskSettingsQuery.graphql';

export interface HelpdeskSettings {
  basicDomain: string | null;
  customDomain: string | null;
  name: string | null;
  logo: string | null;
  banner: string | null;
  languages: string[];
}

interface HelpdeskSettingsState {
  isFetching: boolean;
  settings: HelpdeskSettings | null;
}

// Initial state
const initialState: HelpdeskSettingsState = {
  isFetching: false,
  settings: null,
};

// Async thunk to fetch settings
export const fetchKnowledgeBaseSetting = createAsyncThunk(
  'helpdesk/fetchSettings',
  async () => {
    const result = await fetchQuery<HelpdeskSettingsQuery>(
      relayEnvironment,
      helpdeskSettingsQuery,
      {},
      { fetchPolicy: 'network-only' },
    ).toPromise();

    return result?.helpdeskSettings ?? null;
  },
);

// Slice
const helpdeskSettingsSlice = createSlice({
  name: 'helpdeskSettings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchKnowledgeBaseSetting.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchKnowledgeBaseSetting.fulfilled, (state, action) => {
        state.isFetching = false;

        const payload = action.payload;

        state.settings = payload
          ? {
              basicDomain: payload.basicDomain ?? null,
              customDomain: payload.customDomain ?? null,
              name: payload.name ?? null,
              logo: payload.logo ?? null,
              banner: payload.banner ?? null,
              languages: payload.languages ? [...payload.languages] : [],
            }
          : null;
      })
      .addCase(fetchKnowledgeBaseSetting.rejected, (state) => {
        state.isFetching = false;
      });
  },
});

export default helpdeskSettingsSlice.reducer;
