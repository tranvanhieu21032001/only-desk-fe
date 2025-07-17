import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Conversation } from '../../interfaces/inbox';
import { fetchConversationsRelay } from '../../api/fetchConversationsRelay';

interface InboxState {
  conversations: Record<string, Conversation[]>;
  selectedConversation: Conversation | null;
  loading: boolean;
  error: string | null;
}

const initialState: InboxState = {
  conversations: {},
  selectedConversation: null,
  loading: false,
  error: null,
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
        const conv = conversations.find(c => c.id === conversationId);
        if (conv) {
          conv.unreadCount = unreadCount;
        }
      }
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
  },
});

export const { clearConversations, setSelectedConversation, clearSelectedConversation, updateConversationUnreadCount } = inboxSlice.actions;
export default inboxSlice.reducer;
