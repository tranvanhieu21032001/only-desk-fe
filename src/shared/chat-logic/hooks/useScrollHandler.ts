import { useEffect, useRef, useState } from 'react';

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
  const [isUserAtBottom, setIsUserAtBottom] = useState(false);
  const isInitialRender = useRef(true);

  // 1. Scroll to bottom after messages are initially loaded.
  useEffect(() => {
    if (isInitialRender.current && isLoaded) {
      scrollToBottom();
      isInitialRender.current = false;
    }
  }, [isLoaded]);

  // Scroll to bottom
  const scrollToBottom = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  // Detect scroll position
  const handleScroll = () => {
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

    // Detect if user is at bottom
    const tolerance = 1; // or 2 for safety
    const isAtBottom =
      Math.abs(scrollTop + clientHeight - scrollHeight) <= tolerance;
    setIsUserAtBottom(isAtBottom);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [containerRef]);

  return {
    scrollToBottom,
    isUserAtBottom,
  };
}
