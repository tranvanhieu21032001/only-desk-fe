import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Conversation } from '../../interfaces/inbox';
import { getConversationList } from '../../api/inbox.api';

interface InboxState {
  conversations: Record<string, Conversation[]>;
  loading: boolean;
  error: string | null;
}

const initialState: InboxState = {
  conversations: {},
  loading: false,
  error: null,
};

export const fetchConversations = createAsyncThunk(
  'inbox/fetchConversations',
  async (workspaceId: string, { rejectWithValue }) => {
    try {
      const response = await getConversationList(workspaceId, 1, 10);
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
      state.loading = false;
      state.error = null;
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

export const { clearConversations } = inboxSlice.actions;
export default inboxSlice.reducer;
