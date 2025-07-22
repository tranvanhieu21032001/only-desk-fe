import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchQuery } from 'react-relay';

import relayEnvironment from '@/relay/RelayEnvironment';
import { coversationDetailsQuery } from '@/relay/CoversationDetailsQuery';
import { CoversationDetailsQuery } from '@/relay/__generated__/CoversationDetailsQuery.graphql';

interface ContactState {
  isLoading: boolean;
  contactByIdCoversation: any | null;
}

const initialState: ContactState = {
  isLoading: false,
  contactByIdCoversation: null,
};

export const fetchContactByConversationId = createAsyncThunk(
  'contact/fetchByConversationId',
  async (conversationId: string) => {
    const result = await fetchQuery<CoversationDetailsQuery>(
      relayEnvironment,
      coversationDetailsQuery,
      { id: conversationId },
      { fetchPolicy: 'network-only' },
    ).toPromise();

    if (result?.node && 'contact' in result.node) {;
      return (result.node as any);
    }

    return null;
  },
);

const contactSlice = createSlice({
  name: 'contactByConversationId',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchContactByConversationId.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchContactByConversationId.fulfilled, (state, action) => {
      state.isLoading = false;
      state.contactByIdCoversation = action.payload;
    });
    builder.addCase(fetchContactByConversationId.rejected, (state) => {
      state.isLoading = false;
      state.contactByIdCoversation = null;
    });
  },
});

export default contactSlice.reducer;
