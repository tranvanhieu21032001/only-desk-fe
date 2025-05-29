import { useState, useCallback } from 'react';

export function useScrollHandler({
  loadingMore,
  hasNextPage,
  loadMore,
  pendingImageScroll,
  messageContainerRef,
  messageEndRef,
}: {
  loadingMore: boolean;
  hasNextPage: boolean;
  loadMore: () => Promise<void>;
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
    const isAtBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <
      10;
    setWasAtBottom(isAtBottom);
    if (isAtBottom) {
      setShowNewMessageNotice(false);
    }
  }, [messageContainerRef]);

  // Scroll to bottom
  const scrollToBottom = useCallback(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    setShowNewMessageNotice(false);
  }, [messageEndRef]);

  // Infinite scroll: load more messages when scroll to top
  const handleLoadMore = useCallback(async () => {
    const container = messageContainerRef.current;
    if (!container) return;
    if (container.scrollTop === 0 && hasNextPage && !loadingMore) {
      // Save current scroll position
      const prevScrollHeight = container.scrollHeight;
      const prevScrollTop = container.scrollTop;
      await loadMore();
      // After messages have been updated
      setTimeout(() => {
        if (!container) return;
        const newScrollHeight = container.scrollHeight;
        container.scrollTop =
          newScrollHeight - prevScrollHeight + prevScrollTop;
      }, 0);
    }
  }, [hasNextPage, loadingMore, loadMore, messageContainerRef]);

  return {
    wasAtBottom,
    setWasAtBottom,
    showNewMessageNotice,
    setShowNewMessageNotice,
    handleScroll,
    handleLoadMore,
    scrollToBottom,
  };
}
