import { useEffect, useCallback, useMemo, useState } from 'react';
import { useLazyLoadQuery, usePaginationFragment } from 'react-relay';

import { RelayStoreHelper } from '../helpers/relay-store.helper';
import { markTimestamps, parseGraphQLMessage } from '../helpers/chat.helper';
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

  // Cache to preserve showDate/showTime flags when messages are recalculated
  // This prevents UI flickering when loading more messages, as timestamp display
  // decisions are maintained across re-renders and pagination
  const [timestampCache, setTimestampCache] = useState<
    Map<string, { showDate: boolean; showTime: boolean }>
  >(new Map());

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

  // Calculate messages with timestamps and cache them in useMemo
  const messagesWithTimestamps = useMemo(() => {
    const rawMessages = data.messages.edges.map((edge: any) => {
      const node = edge.node;
      const parsed = parseGraphQLMessage(node);

      // Restore cached timestamp info to maintain UI consistency
      // Without this, messages would lose their showDate/showTime flags
      // when new messages are loaded via pagination
      const cached = timestampCache.get(parsed.id);
      if (cached) {
        parsed.showDate = cached.showDate;
        parsed.showTime = cached.showTime;
      }

      return parsed;
    });

    return markTimestamps(rawMessages);
  }, [data]); // Only depend on data to avoid infinite re-renders

  // Update cache in separate useEffect to prevent infinite loop
  // This preserves showDate/showTime decisions for future re-calculations
  useEffect(() => {
    const newCache = new Map(timestampCache);
    messagesWithTimestamps.forEach((msg) => {
      newCache.set(msg.id, {
        showDate: msg.showDate || false,
        showTime: msg.showTime || false,
      });
    });
    setTimestampCache(newCache);
  }, [messagesWithTimestamps]);

  return {
    messages: messagesWithTimestamps,
    isFetchingInitial,
    isLoadingNext,
    hasNext,
    loadMore,
    addMessage,
    updateMessage,
    removeMessage,
  };
}
