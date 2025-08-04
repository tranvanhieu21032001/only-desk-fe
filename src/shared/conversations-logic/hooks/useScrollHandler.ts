import { useEffect, useCallback } from 'react';

interface UseScrollHandlerProps {
  onLoadMore: (onComplete?: (error?: Error | null) => void) => void;
  conversationContainerRef: React.RefObject<HTMLDivElement | null>;
}

interface UseScrollHandlerReturn {}

export function useScrollHandler({
  onLoadMore,
  conversationContainerRef,
}: UseScrollHandlerProps): UseScrollHandlerReturn {
  const containerRef = conversationContainerRef;

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;

    if (scrollTop + clientHeight >= scrollHeight - 50) {
      onLoadMore?.((error) => {
        if (error) {
          console.error('Failed to load more conversations:', error);
          return;
        }
      });
    }
  }, [containerRef, onLoadMore]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return {};
}
