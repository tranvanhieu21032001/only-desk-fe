import { useEffect, useCallback, useMemo, useState } from 'react';
import { useLazyLoadQuery, usePaginationFragment } from 'react-relay';

import { RelayStoreHelper } from '../helpers/relay-store.helper';
import { parseGraphQLMessage } from '../helpers/chat.helper';
import { Message } from '../interfaces/inbox';
import { conversationMessagesQuery } from '../relay/ConversationMessagesQuery';
import { ConversationMessagesQuery } from '../relay/__generated__/ConversationMessagesQuery.graphql';
import { MessageFragment_query$key } from '../relay/__generated__/MessageFragment_query.graphql';
import { messageListFragment } from '../relay/MessageFragment';

const MESSAGE_LIMIT = 20;

interface UseMessageListProps {
  rawConversationId: string | null;
}

interface UseMessageListReturn {
  messages: Message[];
  isFetchingInitial: boolean;
  isLoadingNext: boolean;
  hasNext: boolean;
  loadMore: (onComplete?: (error?: Error | null) => void) => void;
  addMessage: (msg: Message) => void;
  updateMessage: (messageId: string, updates: Partial<Message>) => void;
  removeMessage: (messageId: string) => void;
}

export function useMessageList({
  rawConversationId,
}: UseMessageListProps): UseMessageListReturn {
  if (!rawConversationId) {
    return {
      messages: [],
      hasNext: false,
      isLoadingNext: false,
      isFetchingInitial: false,
      loadMore: () => {},
      addMessage: () => {},
      updateMessage: () => {},
      removeMessage: () => {},
    };
  }

  const [isFetchingInitial, setIsFetchingInitial] = useState(true);

  const queryVariables = useMemo(
    () => ({
      conversationId: rawConversationId || '',
      first: MESSAGE_LIMIT,
      after: null,
    }),
    [rawConversationId],
  );

  const queryData = useLazyLoadQuery<ConversationMessagesQuery>(
    conversationMessagesQuery,
    queryVariables,
    {
      fetchPolicy: 'store-and-network',
    },
  );

  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment<
    ConversationMessagesQuery,
    MessageFragment_query$key
  >(messageListFragment, queryData);

  // Reset isFetchingInitial when conversationId changes
  useEffect(() => {
    setIsFetchingInitial(true);
  }, [rawConversationId]);

  // Set isFetchingInitial to false when data is loaded
  useEffect(() => {
    if (data) {
      setIsFetchingInitial(false);
    }
  }, [data]);

  const loadMore = useCallback(
    (onComplete?: (error?: Error | null) => void) => {
      if (hasNext && !isLoadingNext) {
        loadNext(MESSAGE_LIMIT, {
          onComplete,
        });
      }
    },
    [hasNext, isLoadingNext, loadNext],
  );

  const addMessage = useCallback(
    (msg: Message) => {
      RelayStoreHelper.addMessage(msg, rawConversationId, false);
    },
    [rawConversationId],
  );

  const updateMessage = useCallback(
    (messageId: string, updates: Partial<Message>) => {
      RelayStoreHelper.updateMessage(messageId, updates);
    },
    [],
  );

  const removeMessage = useCallback(
    (messageId: string) => {
      RelayStoreHelper.removeMessage(messageId, rawConversationId);
    },
    [rawConversationId],
  );

  return {
    messages: data.messages.edges.map((edge: any) => {
      const node = edge.node;
      return parseGraphQLMessage(node);
    }),
    isFetchingInitial,
    isLoadingNext,
    hasNext,
    loadMore,
    addMessage,
    updateMessage,
    removeMessage,
  };
}
