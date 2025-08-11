import { useCallback, useEffect, useRef, useState } from 'react';

interface UseScrollHandlerProps {
  isLoaded: boolean;
  onLoadMore: (onComplete?: (error?: Error | null) => void) => void;
  messageContainerRef: React.RefObject<HTMLDivElement | null>;
}

interface UseScrollHandlerReturn {
  scrollToBottom: () => void;
  isUserAtBottom: boolean;
}

export function useScrollHandler({
  isLoaded,
  onLoadMore,
  messageContainerRef,
}: UseScrollHandlerProps): UseScrollHandlerReturn {
  const containerRef = messageContainerRef;
  const [isUserAtBottom, setIsUserAtBottom] = useState(true);
  const isInitialRender = useRef(true);

  // Scroll to bottom
  const scrollToBottom = useCallback(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [containerRef]);

  // 1. Scroll to bottom after messages are initially loaded.
  useEffect(() => {
    if (isInitialRender.current && isLoaded) {
      scrollToBottom();
      isInitialRender.current = false;
    }
  }, [isLoaded, scrollToBottom]);

  // Detect scroll position
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;

    // 3. Load more messages when scrolled to top.
    if (scrollTop === 0) {
      const previousScrollHeight = container.scrollHeight; //save previous scroll height to keep scroll position after load more
      onLoadMore?.((error) => {
        if (error) {
          console.error('Failed to load more messages:', error);
          return;
        }
        // Wait for React + Relay render (after prepending data)
        setTimeout(() => {
          const newScrollHeight = container.scrollHeight;
          // 32px is the height of the loading message
          const delta = newScrollHeight - previousScrollHeight - 32;
          container.scrollTop = delta;
        }, 0);
      });
    }

    // Detect if user is at bottom within a tolerance
    const tolerance = 300; // Consider user at bottom when within 300px
    const isAtBottom = scrollHeight - scrollTop - clientHeight <= tolerance;
    setIsUserAtBottom(isAtBottom);
  }, [containerRef, onLoadMore]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [containerRef, handleScroll]);

  return {
    scrollToBottom,
    isUserAtBottom,
  };
}
