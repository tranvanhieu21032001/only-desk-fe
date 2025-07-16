import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  InboxMessageType,
  InboxSender,
  InboxMessageStatus,
} from '@/modules/settings/helpers/enums/inbox.enums';
import type { Message } from '../interfaces/inbox';

export function useScrollHandler({
  isLoadingNext, // nhận từ relay
  hasNextPage,
  loadMore,
  pendingImageScroll,
  messageContainerRef,
  messageEndRef,
}: {
  isLoadingNext: boolean;
  hasNextPage: boolean;
  loadMore: () => Promise<void> | void;
  pendingImageScroll: boolean;
  messageContainerRef: React.RefObject<HTMLDivElement | null>;
  messageEndRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [wasAtBottom, setWasAtBottom] = useState(true);
  const [showNewMessageNotice, setShowNewMessageNotice] = useState(false);

  // Check if user is at bottom
  const handleScroll = useCallback(() => {
    const container = messageContainerRef.current;
    if (!container) return;
    if (isLoadingNext) return;
    const isAtBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight < 10;
    setWasAtBottom(isAtBottom);
    if (isAtBottom) {
      setShowNewMessageNotice(false);
    }
  }, [messageContainerRef, isLoadingNext]);

  const scrollToBottom = useCallback(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    setShowNewMessageNotice(false);
  }, [messageEndRef]);

  const scrollToShowNewMessage = useCallback(() => {
    const container = messageContainerRef.current;
    if (!container) return;
    if (isLoadingNext) return;
    const currentScrollTop = container.scrollTop;
    const maxScrollTop = container.scrollHeight - container.clientHeight;
    const gentleScrollDistance = Math.min(60, maxScrollTop - currentScrollTop);
    if (gentleScrollDistance > 0) {
      const targetScrollTop = currentScrollTop + gentleScrollDistance;
      container.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth',
      });
    }
    setShowNewMessageNotice(false);
  }, [messageContainerRef, isLoadingNext]);

  // Infinite scroll: load more messages when scroll to top
  const handleLoadMore = useCallback(async () => {
    const container = messageContainerRef.current;
    if (!container) return;
    if (container.scrollTop <= 10 && hasNextPage && !isLoadingNext) {
      await loadMore();
    }
  }, [hasNextPage, isLoadingNext, loadMore, messageContainerRef]);

  return {
    wasAtBottom,
    setWasAtBottom,
    showNewMessageNotice,
    setShowNewMessageNotice,
    handleScroll,
    handleLoadMore,
    scrollToBottom,
    scrollToShowNewMessage,
    isLoadingMoreMessages: isLoadingNext,
  };
}
