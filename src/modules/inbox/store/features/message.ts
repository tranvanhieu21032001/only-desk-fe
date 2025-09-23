import { SearchMessagesQuery } from '@/relay/__generated__/SearchMessagesQuery.graphql';
import relayEnvironment from '@/relay/RelayEnvironment';
import { searchMessageQuery } from '@/relay/SearchMessagesQuery';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchQuery } from 'react-relay';

export interface SearchMessageProps {
  id: string;
  content: string;
  conversationId: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    avatar: string;
  };
  sender:string;
  createdAt:string;
}

export const fetchSearchMessages = createAsyncThunk(
  'messages/fetchSearchMessages',
  async (
    { keyword, first }: { keyword: string; first?: number },
    { rejectWithValue },
  ) => {
    try {
      const result = await fetchQuery<SearchMessagesQuery>(
        relayEnvironment,
        searchMessageQuery,
        { keyword, first },
        { fetchPolicy: 'network-only' },
      ).toPromise();

      if (!result?.searchMessages) return [];

      const edges = result.searchMessages.edges || [];

      const messages: SearchMessageProps[] = edges.map((edge) => {
        const node = edge?.node;
        if (!node) return null;

        return {
          id: node.id || '',
          content: node.content || '',
          conversationId: node.conversation?.id || '',
          user: {
            id: node.user?.id || '',
            firstName: node.user?.firstName || '',
            lastName: node.user?.lastName || '',
            avatar: node.user?.avatar || '',
          },
          sender: node.sender || '',
          createdAt: node.createdAt || ''
        };
      }).filter(Boolean) as SearchMessageProps[];

      return messages;
    } catch (error: any) {
      return rejectWithValue(error?.message || 'Error searching messages');
    }
  },
);

const searchMessagesSlice = createSlice({
  name: 'searchMessages',
  initialState: {
    data: [] as SearchMessageProps[],
    loading: false,
    error: null as string | null,
  },
  reducers: {
    clearSearchMessages: (state) => {
      state.data = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSearchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSearchMessages } = searchMessagesSlice.actions;

export default searchMessagesSlice.reducer;
