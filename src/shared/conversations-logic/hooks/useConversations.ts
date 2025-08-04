import { useCallback, useRef } from 'react';

import { useConversationList } from './useConversationList';
import { Conversation } from '@/shared/chat-logic';
import { useScrollHandler } from './useScrollHandler';

/*
Features:

1. Scroll to bottom after messages are initially loaded. (do at useScrollHandler)
2. Scroll to bottom when the owner sends a message.
3. Load more messages when scrolled to top.
4. Handle new incoming messages:
  + If user is at the bottom: append and auto-scroll.
  + If user is scrolled up: store in temp and show "new message" button.
  + On click of the button: append temp messages and scroll to bottom.
*/

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

  return {
    conversations,
    isFetchingInitial,
    isLoadingNext,
  };
}
