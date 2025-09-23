import { SearchMessagesQuery } from '@/relay/__generated__/SearchMessagesQuery.graphql';
import relayEnvironment from '@/relay/RelayEnvironment';
import { searchMessageQuery } from '@/relay/SearchMessagesQuery';
import { PAGE_SIZE } from '@/shared/constant/common';
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

interface SearchMessagesState {
  data: SearchMessageProps[];
  loading: boolean;
  error: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export const fetchSearchMessages = createAsyncThunk(
  'messages/fetchSearchMessages',
  async (
    { keyword, after }: { keyword: string; after?: string | null },
    { rejectWithValue },
  ) => {
    try {
      const result = await fetchQuery<SearchMessagesQuery>(
        relayEnvironment,
        searchMessageQuery,
        { keyword, first: PAGE_SIZE, after },
        { fetchPolicy: 'network-only' },
      ).toPromise();

      if (!result?.searchMessages) {
        return { messages: [], endCursor: null, hasNextPage: false };
      }

      const { edges = [], pageInfo } = result.searchMessages;

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
      
      return {
        messages,
        endCursor: pageInfo?.endCursor || null,
        hasNextPage: pageInfo?.hasNextPage || false
      };

    } catch (error: any) {
      return rejectWithValue(error?.message || 'Error searching messages');
    }
  },
);

const searchMessagesSlice = createSlice({
  name: 'searchMessages',
  initialState: {
    data: [],
    loading: false,
    error: null,
    endCursor: null,
    hasNextPage: true,
  } as SearchMessagesState,
  reducers: {
    clearSearchMessages: (state) => {
      state.data = [];
      state.error = null;
      state.loading = false;
      state.endCursor = null;
      state.hasNextPage = true;
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
        const isInitialSearch = !action.meta.arg.after;

        if (isInitialSearch) {
          state.data = action.payload.messages;
        } else {
          state.data = [...state.data, ...action.payload.messages];
        }
        state.endCursor = action.payload.endCursor;
        state.hasNextPage = action.payload.hasNextPage;
      })
      .addCase(fetchSearchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSearchMessages } = searchMessagesSlice.actions;

export default searchMessagesSlice.reducer;