import { useEffect, useCallback, useMemo, useState } from 'react';
import { useLazyLoadQuery, usePaginationFragment } from 'react-relay';

import { parseGraphQLConversation } from '../helpers/conversation.helper';
import { ConversationListQuery } from '../relay/__generated__/ConversationListQuery.graphql';
import { conversationListQuery } from '../relay/ConversationListQuery';
import { ConversationFragment_query$key } from '../relay/__generated__/ConversationFragment_query.graphql';
import { conversationListFragment } from '../relay/ConversationFragment';
import { Conversation } from '@/shared/interfaces/conversation.interface';

const CONVERSATIONS_LIMIT = 10;

interface UseConversationListProps {
  isAssignedToMe: boolean | null;
}

interface UseConversationListReturn {
  conversations: Conversation[];
  isFetchingInitial: boolean;
  isLoadingNext: boolean;
  hasNext: boolean;
  loadMore: (onComplete?: (error?: Error | null) => void) => void;
}

export function useConversationList({
  isAssignedToMe,
}: UseConversationListProps): UseConversationListReturn {
  const [isFetchingInitial, setIsFetchingInitial] = useState(true);

  const queryVariables = useMemo(
    () => ({
      assignedToMe: isAssignedToMe || false,
      first: CONVERSATIONS_LIMIT,
    }),
    [isAssignedToMe],
  );

  const queryData = useLazyLoadQuery<ConversationListQuery>(
    conversationListQuery,
    queryVariables,
    {
      fetchPolicy: 'store-and-network',
    },
  );

  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment<
    ConversationListQuery,
    ConversationFragment_query$key
  >(conversationListFragment, queryData);

  // Reset isFetchingInitial when conversationId changes
  useEffect(() => {
    setIsFetchingInitial(true);
  }, [isAssignedToMe]);

  // Set isFetchingInitial to false when data is loaded
  useEffect(() => {
    if (data) {
      setIsFetchingInitial(false);
    }
  }, [data]);

  const loadMore = useCallback(
    (onComplete?: (error?: Error | null) => void) => {
      if (hasNext && !isLoadingNext) {
        loadNext(CONVERSATIONS_LIMIT, {
          onComplete,
        });
      }
    },
    [hasNext, isLoadingNext, loadNext],
  );

  return {
    conversations: data.conversations.edges.map((edge: any) => {
      const node = edge.node;
      return parseGraphQLConversation(node);
    }),
    isFetchingInitial,
    isLoadingNext,
    hasNext,
    loadMore,
  };
}
