import { useState, useCallback, useRef, useEffect } from 'react';

export function useScrollHandler({
  isLoadingNext,
  hasNextPage,
  loadMore,
  messageContainerRef,
  messageEndRef,
  messages,
  loading,
  stableConversationId,
}: {
  isLoadingNext: boolean;
  hasNextPage: boolean;
  loadMore: () => Promise<void> | void;
  pendingImageScroll: boolean;
  messageContainerRef: React.RefObject<HTMLDivElement | null>;
  messageEndRef: React.RefObject<HTMLDivElement | null>;
  messages: any[];
  loading: boolean;
  stableConversationId: string | null;
}) {
  const [wasAtBottom, setWasAtBottom] = useState(true);
  const [showNewMessageNotice, setShowNewMessageNotice] = useState(false);
  const [lastMessageId, setLastMessageId] = useState<string | null>(null);
  const prevMessageCount = useRef(messages.length);
  const wasLoadingRef = useRef(false);
  const justLoadedMore = useRef(false);
  const isFirstMessageLoad = useRef(true);
  const prevStableConversationId = useRef<string | null>(null);

  // Optimize initial scroll to prevent flash
  useEffect(() => {
    if (
      !loading &&
      messages.length > 0 &&
      isFirstMessageLoad.current &&
      stableConversationId
    ) {
      const container = messageContainerRef.current;
      if (container) {
        requestAnimationFrame(() => {
          if (container) {
            container.scrollTop = container.scrollHeight;
            isFirstMessageLoad.current = false;
          }
        });
      }
    }
  }, [loading, messages.length, stableConversationId, messageContainerRef]);

  // Reset scroll state when conversation changes
  useEffect(() => {
    const conversationChanged = prevStableConversationId.current !== stableConversationId;
    if (!conversationChanged || !stableConversationId) return;
    setLastMessageId(null);
    isFirstMessageLoad.current = true;
    prevStableConversationId.current = stableConversationId;
  }, [stableConversationId]);

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

  // Attach scroll listeners
  useEffect(() => {
    const container = messageContainerRef.current;
    if (!container) return;
    container.addEventListener('scroll', handleScroll);
    container.addEventListener('scroll', handleLoadMore);
    return () => {
      container.removeEventListener('scroll', handleScroll);
      container.removeEventListener('scroll', handleLoadMore);
    };
  }, [handleScroll, handleLoadMore, messageContainerRef]);

  // Auto scroll and show new message notice
  useEffect(() => {
    if (messages.length === 0) return;
    if (isLoadingNext) {
      justLoadedMore.current = true;
    } else if (justLoadedMore.current) {
      justLoadedMore.current = false;
    }
    const currentCount = messages.length;
    const previousCount = prevMessageCount.current;
    const justFinishedLoading = wasLoadingRef.current && !isLoadingNext;
    if (justFinishedLoading && currentCount > previousCount) {
      wasLoadingRef.current = false;
      prevMessageCount.current = currentCount;
      const newestMessage = messages[0];
      setLastMessageId(newestMessage?.id);
      return;
    }
    if (!isLoadingNext) {
      wasLoadingRef.current = false;
    }
    prevMessageCount.current = currentCount;
    const newestMessage = messages[0];
    const newestId = newestMessage?.id;
    if (!lastMessageId) {
      setLastMessageId(newestId);
      return;
    }
    if (newestId !== lastMessageId) {
      const now = new Date();
      const messageTime = new Date(newestMessage.createdAt);
      const timeDifference = now.getTime() - messageTime.getTime();
      const isRecentMessage = timeDifference < 10000;
      if (justLoadedMore.current) {
        setLastMessageId(newestId);
        return;
      }
      if (isRecentMessage && !isLoadingNext && wasAtBottom) {
        setTimeout(() => {
          scrollToShowNewMessage();
        }, 0);
        setShowNewMessageNotice(false);
      } else if (isRecentMessage && !isLoadingNext) {
        setShowNewMessageNotice(true);
      }
    }
    setLastMessageId(newestId);
  }, [messages, wasAtBottom, scrollToShowNewMessage, setShowNewMessageNotice, lastMessageId, isLoadingNext]);

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
