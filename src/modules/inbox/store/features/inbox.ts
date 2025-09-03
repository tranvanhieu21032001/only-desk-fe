import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchQuery } from 'react-relay';
import relayEnvironment from '@/relay/RelayEnvironment';
import { CoversationDetailsQuery } from '@/relay/__generated__/CoversationDetailsQuery.graphql';
import { coversationDetailsQuery } from '@/shared/conversations-logic/relay/CoversationDetailsQuery';

import webStorageClient from '@/shared/utils/webStorageClient';
import { constants } from '@/core/settings';
import { User } from '@/shared/interfaces/user.interface';
import { Conversation } from '@/shared/interfaces/conversation.interface';
import { Contact, ContactContext } from '@/shared/interfaces/contact.interface';

export interface InboxState {
  selectedConversation: Conversation | null;
  loading: boolean;
  error: string | null;
  isSidebarOpen: boolean;
}

export const initialState: InboxState = {
  selectedConversation: null,
  loading: false,
  error: null,
  isSidebarOpen: false,
};

// Async thunk để lấy thông tin chi tiết hội thoại
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

      if (!result?.node) return null;

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
        context: (data.contact?.context || {}) as ContactContext,
        guestId: data.contact?.guestId || '',
        notification: data.contact?.notification || false,
      };

      const conversation: Conversation = {
        id: data.id || '',
        rawId: data.rawId || '',
        contact,
        resolved: data.resolved || false,
        assignedTo: data.assignedTo?.id || null,
        participants: data.participants
          ? ([...data.participants] as (User | string)[])
          : undefined,
        lastActivityAt: data.lastActivityAt || '',
      };

      return conversation;
    } catch (error: any) {
      return rejectWithValue(
        error?.message || 'Error fetching conversation detail',
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
    updateConversationUnreadCount(_state, _action) {
      // implement when needed
    },
    updateConversationResolved(_state, _action) {
      // implement when needed
    },
    updateSelectedConversationContact(state, action) {
      if (state.selectedConversation?.contact) {
        state.selectedConversation.contact = {
          ...state.selectedConversation.contact,
          ...action.payload,
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
