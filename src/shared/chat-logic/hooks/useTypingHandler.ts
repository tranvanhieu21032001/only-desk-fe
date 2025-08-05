import { useEffect, useRef, useState } from 'react';
import {
  emitTypingStart,
  emitTypingStop,
  listenUserTyping,
  offUserTyping,
} from '../services/socket';

interface UseTypingHandlerProps {
  rawConversationId: string;
}

interface UseTypingHandlerReturn {
  handleUserTyping: (val: string) => void;
  handleUserStopTyping: () => void;
  isSomeoneTyping: boolean;
}

interface UserTypingData {
  conversationId: string;
  isGuest: boolean;
  isTyping: boolean;
  userId?: string;
}

export function useTypingHandler({
  rawConversationId,
}: UseTypingHandlerProps): UseTypingHandlerReturn {
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isTypingRef = useRef(false);

  const handleUserTyping = (val: string) => {
    if (!isTypingRef.current) {
      isTypingRef.current = true;
      emitTypingStart(rawConversationId);
    }

    // Reset old timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // if not typing after 2s, emit typing stop
    //TODO: duplicate emit stop typing event when call handleUserStopTyping function in useChat
    typingTimeoutRef.current = setTimeout(() => {
      isTypingRef.current = false;
      emitTypingStop(rawConversationId);
    }, 2000);
  };

  useEffect(() => {
    const handleUserTyping = (data: UserTypingData) => {
      if (data.conversationId !== rawConversationId) return;
      setIsTyping(data.isTyping);
    };

    listenUserTyping(handleUserTyping);
    return () => {
      offUserTyping(handleUserTyping);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [rawConversationId]);

  return {
    handleUserTyping,
    handleUserStopTyping: () => {
      isTypingRef.current = false;
      emitTypingStop(rawConversationId);
    },
    isSomeoneTyping: isTyping,
  };
}
