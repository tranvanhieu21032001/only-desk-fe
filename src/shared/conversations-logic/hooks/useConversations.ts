import { useCallback, useEffect } from 'react';

import { useConversationList } from './useConversationList';
import { useScrollHandler } from './useScrollHandler';
import { eventBus } from '@/shared/chat-logic/services/event-bus';
import { EVENTBUS_UPDATED_CONVERSATION } from '@/shared/chat-logic/constants/event-bus.constants';
import { fetchConversationDetailForList } from '../services/services';
import { RelayStoreHelper } from '../helpers/relay-store.helper';
import { Conversation } from '@/shared/interface/conversation.interface';

interface UseConversationsProps {
  isAssignedToMe: boolean | null;
  conversationContainerRef: React.RefObject<HTMLDivElement | null>;
}

interface UseConversationsReturn {
  conversations: Conversation[];
  isFetchingInitial: boolean;
  isLoadingNext: boolean;
}

export function useConversations({
  isAssignedToMe,
  conversationContainerRef,
}: UseConversationsProps): UseConversationsReturn {
  const { conversations, isFetchingInitial, isLoadingNext, loadMore } =
    useConversationList({ isAssignedToMe });

  const onLoadMore = useCallback(
    (onComplete?: (error?: Error | null) => void) => {
      loadMore(onComplete);
    },
    [loadMore],
  );

  useScrollHandler({
    onLoadMore: onLoadMore,
    conversationContainerRef,
  });

  const handleUpdatedConversation = useCallback(
    async (rawData: any) => {
      console.log('Updated conversation:', rawData);
      // Fetch updated conversation details
      const updatedConversation = await fetchConversationDetailForList(
        rawData.conversationId,
      );

      if (updatedConversation) {
        // Check if conversation exists in list, if not add it, if exists move to top
        RelayStoreHelper.addOrMoveConversationToTop(
          updatedConversation,
          isAssignedToMe || false,
        );
      }
    },
    [isAssignedToMe],
  );

  useEffect(() => {
    eventBus.on(EVENTBUS_UPDATED_CONVERSATION, handleUpdatedConversation);
    return () => {
      eventBus.off(EVENTBUS_UPDATED_CONVERSATION, handleUpdatedConversation);
    };
  }, [handleUpdatedConversation]);

  return {
    conversations,
    isFetchingInitial,
    isLoadingNext,
  };
}
