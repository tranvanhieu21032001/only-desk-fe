import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  InboxMessageType,
  InboxSender,
  InboxMessageStatus,
} from '@/modules/settings/helpers/enums/inbox.enums';
import type { Message } from '../interfaces/inbox';

export function useScrollHandler({
  loadingMore,
  hasNextPage,
  loadMore,
  pendingImageScroll,
  messageContainerRef,
  messageEndRef,
  addMessage,
  removeMessage,
}: {
  loadingMore: boolean;
  hasNextPage: boolean;
  loadMore: () => Promise<void> | void;
  pendingImageScroll: boolean;
  messageContainerRef: React.RefObject<HTMLDivElement | null>;
  messageEndRef: React.RefObject<HTMLDivElement | null>;
  addMessage: (message: Message) => void;
  removeMessage: (messageId: string) => void;
}) {
  const [wasAtBottom, setWasAtBottom] = useState(true);
  const [showNewMessageNotice, setShowNewMessageNotice] = useState(false);
  const [isLoadingMoreMessages, setIsLoadingMoreMessages] = useState(false);

  // Check if user is at bottom
  const handleScroll = useCallback(() => {
    const container = messageContainerRef.current;
    if (!container) return;

    if (isLoadingMoreMessages) {
      return;
    }

    const isAtBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <
      10;
    setWasAtBottom(isAtBottom);
    if (isAtBottom) {
      setShowNewMessageNotice(false);
    }
  }, [messageContainerRef, isLoadingMoreMessages]);

  const scrollToBottom = useCallback(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    setShowNewMessageNotice(false);
  }, [messageEndRef]);

  const scrollToShowNewMessage = useCallback(() => {
    const container = messageContainerRef.current;
    if (!container) return;

    if (isLoadingMoreMessages) {
      return;
    }

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
  }, [messageContainerRef, isLoadingMoreMessages]);

  // Infinite scroll: load more messages when scroll to top
  const handleLoadMore = useCallback(async () => {
    const container = messageContainerRef.current;
    if (!container) return;

    if (container.scrollTop <= 10 && hasNextPage && !loadingMore) {
      setIsLoadingMoreMessages(true);

      const loadingMessageId = `loading_${uuidv4()}`;
      const loadingMessage: Message = {
        id: loadingMessageId,
        content: '',
        sender: InboxSender.Guest,
        type: InboxMessageType.Loading,
        status: InboxMessageStatus.Sent,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        user: null,
      };

      addMessage(loadingMessage);

      const prevScrollHeight = container.scrollHeight;
      const prevScrollTop = container.scrollTop;

      try {
        const result = loadMore();
        if (result instanceof Promise) {
          await result;
        }
      } catch (error) {
        console.error(' [Scroll] Error loading more messages:', error);
      } finally {
        removeMessage(loadingMessageId);
      }

      const maintainPosition = () => {
        if (!container) return;

        const newScrollHeight = container.scrollHeight;
        const heightDifference = newScrollHeight - prevScrollHeight;
        const newScrollTop = prevScrollTop + heightDifference;

        container.scrollTop = newScrollTop;
      };

      requestAnimationFrame(() => {
        requestAnimationFrame(maintainPosition);
      });

      setTimeout(() => {
        setIsLoadingMoreMessages(false);
      }, 100);
    }
  }, [
    hasNextPage,
    loadingMore,
    loadMore,
    messageContainerRef,
    addMessage,
    removeMessage,
  ]);

  return {
    wasAtBottom,
    setWasAtBottom,
    showNewMessageNotice,
    setShowNewMessageNotice,
    handleScroll,
    handleLoadMore,
    scrollToBottom,
    scrollToShowNewMessage,
    isLoadingMoreMessages,
  };
}
