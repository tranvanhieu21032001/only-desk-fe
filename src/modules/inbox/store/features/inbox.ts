import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchQuery } from 'react-relay';

import { Contact, Conversation } from '../../interfaces/inbox';
import relayEnvironment from '@/relay/RelayEnvironment';
import { CoversationDetailsQuery } from '@/relay/__generated__/CoversationDetailsQuery.graphql';
import webStorageClient from '@/shared/utils/webStorageClient';
import { constants } from '@/core/settings';
import { coversationDetailsQuery } from '@/shared/conversations-logic/relay/CoversationDetailsQuery';

interface InboxState {
  selectedConversation: Conversation | null;
  loading: boolean;
  error: string | null;
  isSidebarOpen: boolean;
}

const initialState: InboxState = {
  selectedConversation: null,
  loading: false,
  error: null,
  isSidebarOpen: false,
};

export const fetchConversationDetail = createAsyncThunk(
  'inbox/fetchConversationDetail',
  async (conversationId: string, { rejectWithValue }) => {
    try {
      const result = await fetchQuery<CoversationDetailsQuery>(
        relayEnvironment,
        coversationDetailsQuery,
        { id: conversationId },
        { fetchPolicy: 'network-only' },
      ).toPromise();

      if (result?.node) {
        const data = result.node;

        const contact: Contact = {
          id: data.contact?.id || '',
          rawId: data.contact?.rawId || '',
          createdAt: data?.createdAt || '',
          updatedAt: data?.updatedAt || '',
          name: data.contact?.name || 'No Name',
          email: data.contact?.email || '',
          segments: [...(data?.segments || [])],
          isOnline: data.contact?.isOnline ?? false,
          metadata: data?.metadata || {},
          lastActivityAt: data?.lastActivityAt || '',
          avatar: data.contact?.avatar || '',
          countryCode: data.contact?.context?.countryCode || '',
          city: data.contact?.context?.city || '',
          countryName: data.contact?.context?.countryName || '',
          browser: data.contact?.context?.browser || '',
          os: data.contact?.context?.os || '',
          guestId: data.contact?.guestId || '',
          notification: data.contact?.notification || false,
        };

        const conversation: Conversation = {
          id: data.id || '',
          rawId: data.rawId || '',
          contact,
          resolved: data.resolved || false,
          assignedTo: data.assignedTo?.id || null,
          participants: data.participants,
          lastActivityAt: data.lastActivityAt || '',
        };

        return conversation;
      }

      return null;
    } catch (error: any) {
      return rejectWithValue(
        error.message || 'Error fetching conversation detail',
      );
    }
  },
);

const inboxSlice = createSlice({
  name: 'inbox',
  initialState,
  reducers: {
    clearConversations(state) {
      state.selectedConversation = null;
      state.loading = false;
      state.error = null;
    },
    setSelectedConversation(state, action) {
      state.selectedConversation = action.payload;
    },
    clearSelectedConversation(state) {
      state.selectedConversation = null;
    },
    updateConversationUnreadCount(state, action) {
      const { workspaceId, conversationId, unreadCount } = action.payload;
    },
    updateConversationResolved(state, action) {
      const { workspaceId, conversationId, resolved } = action.payload;
    },
    updateSelectedConversationContact(state, action) {
      const updates = action.payload;
      if (state.selectedConversation?.contact) {
        state.selectedConversation.contact = {
          ...state.selectedConversation.contact,
          ...updates,
        };
      }
    },
    updateSelectedConversation(state, action) {
      if (state.selectedConversation) {
        state.selectedConversation = {
          ...state.selectedConversation,
          ...action.payload,
        };
      }
    },
    toggleSidebar(state) {
      state.isSidebarOpen = !state.isSidebarOpen;
      webStorageClient.set(constants.IS_SIDEBAR_OPEN, state.isSidebarOpen);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversationDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConversationDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedConversation = action.payload;
      })
      .addCase(fetchConversationDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.selectedConversation = null;
      });
  },
});

export const {
  clearConversations,
  setSelectedConversation,
  clearSelectedConversation,
  updateConversationUnreadCount,
  updateConversationResolved,
  updateSelectedConversationContact,
  updateSelectedConversation,
  toggleSidebar,
} = inboxSlice.actions;

export default inboxSlice.reducer;
