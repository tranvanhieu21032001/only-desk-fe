import { useEffect, useRef, useState } from "react";
import { emitTypingStart, emitTypingStop } from "../services/socket";
import { eventBus } from "../services/event-bus";
import {
  EVENTBUS_SERVER_TYPING,
  EVENTBUS_USER_TYPING,
} from "../constants/event-bus.constants";

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

  const handleUserTyping = (_val: string) => {
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

    eventBus.on(EVENTBUS_USER_TYPING, handleUserTyping);
    eventBus.on(EVENTBUS_SERVER_TYPING, handleUserTyping);
    return () => {
      eventBus.off(EVENTBUS_USER_TYPING, handleUserTyping);
      eventBus.off(EVENTBUS_SERVER_TYPING, handleUserTyping);
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
