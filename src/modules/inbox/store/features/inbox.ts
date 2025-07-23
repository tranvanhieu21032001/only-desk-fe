import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchQuery } from 'react-relay';

import { Contact, Conversation } from '../../interfaces/inbox';
import { fetchConversationsRelay } from '../../api/fetchConversationsRelay';
import relayEnvironment from '@/relay/RelayEnvironment';
import { CoversationDetailsQuery } from '@/relay/__generated__/CoversationDetailsQuery.graphql';
import { coversationDetailsQuery } from '@/relay/CoversationDetailsQuery';
import webStorageClient from '@/shared/utils/webStorageClient';
import { constants } from '@/core/settings';

interface InboxState {
  conversations: Record<string, Conversation[]>;
  selectedConversation: Conversation | null;
  loading: boolean;
  error: string | null;
  isSidebarOpen: boolean;
}

const initialState: InboxState = {
  conversations: {},
  selectedConversation: null,
  loading: false,
  error: null,
  isSidebarOpen: false,
};

export const fetchConversations = createAsyncThunk(
  'inbox/fetchConversations',
  async (workspaceId: string, { rejectWithValue }) => {
    try {
      const response = await fetchConversationsRelay(workspaceId, 10, null);
      return { workspaceId, data: response.data };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error fetching conversations');
    }
  },
);

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
      state.conversations = {};
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
      const conversations = state.conversations[workspaceId];
      if (conversations) {
        const conv = conversations.find((c) => c.id === conversationId);
        if (conv) {
          conv.unreadCount = unreadCount;
        }
      }
    },
    updateConversationResolved(state, action) {
      const { workspaceId, conversationId, resolved } = action.payload;
      const conversations = state.conversations[workspaceId];
      if (conversations) {
        const conv = conversations.find((c) => c.id === conversationId);
        if (conv) {
          conv.resolved = resolved;
        }
      }
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
      .addCase(fetchConversations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.conversations[action.payload.workspaceId] = action.payload.data;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

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
