import { useEffect, useMemo, useRef, useState } from 'react';
import { Message } from '../interfaces/inbox';
import { useMessageList } from './useMessageList';
import { useScrollHandler } from './useScrollHandler';
import { MessageStatus, MessageType } from '../enums/chat.enums';
import {
  createLocalMessage,
  getId,
  parseGraphQLMessage,
} from '../helpers/chat.helper';
import {
  closeConversation,
  openConversation,
  sendMessageToSocket,
  submitInputToSocket,
} from '../services/socket';

import { EVENTBUS_INBOX_MESSAGE } from '../constants/event-bus.constants';
import { useTypingHandler } from './useTypingHandler';
import { useNotification } from './useNotification';
import { eventBus } from '../services/event-bus';
import { User } from '@/shared/interfaces/user.interface';
import { useAppDispatch } from '@/shared/hooks';
import { ProfileCache } from '@/shared/utils/profile-cache';
import { fetchUserProfileCard } from '@/modules/contacts/store/features/contacts';

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

interface UseChatProps {
  conversationId: string | null;
  messageContainerRef: React.RefObject<HTMLDivElement | null>;
  onEndSendMessage?: (message: Message) => void;
}

interface UseChatReturn {
  sendMessage: (
    content: string,
    type: MessageType,
    metadata: any,
    user: User | null | undefined,
    replyTo?: Message | null,
  ) => void;
  submitInput: (messageId: string, inputValue: string) => void;
  hasNewMessage: boolean;
  messages: Message[];
  isFetchingInitial: boolean;
  isLoadingNext: boolean;
  scrollToNewMessages: () => void;
  handleUserTyping: (val: string) => void;
  isSomeoneTyping: boolean;
}

export function useChat({
  conversationId,
  messageContainerRef,
  onEndSendMessage,
}: UseChatProps): UseChatReturn {
  const dispatch = useAppDispatch();
  const stableConversationId = useRef<string | null>(null);
  if (stableConversationId.current !== conversationId) {
    stableConversationId.current = conversationId;
  }
  const rawConversationId = useMemo(
    () => getId(stableConversationId.current!),
    [stableConversationId.current],
  );

  const [hasNewMessage, setHasNewMessage] = useState(false);

  const {
    messages,
    isFetchingInitial,
    isLoadingNext,
    hasNext,
    loadMore,
    addMessage,
    updateMessage,
    removeMessage,
  } = useMessageList({ rawConversationId });

  const { handleUserTyping, isSomeoneTyping, handleUserStopTyping } =
    useTypingHandler({
      rawConversationId: rawConversationId || '',
    });

  const { notifyNewMessage } = useNotification();

  const handleLoadMore = (onComplete?: (error?: Error | null) => void) => {
    if (hasNext && !isLoadingNext) {
      loadMore(onComplete);
    }
  };

  const { scrollToBottom, isUserAtBottom } = useScrollHandler({
    isLoaded: !isFetchingInitial && messages.length > 0,
    onLoadMore: handleLoadMore,
    messageContainerRef,
  });

  // Wait for the next animation frame to ensure the new message is rendered in the DOM
  // before scrolling. This prevents scrolling before the UI updates.
  const scrollToBottomNextFrame = (latestMessage: Message) => {
    const container = messageContainerRef.current;
    if (!container) return;

    if (latestMessage.type !== MessageType.IMAGE) {
      //TODO: when many incoming messages it's delay to scroll to bottom. Should use IntersectionObserver to check if the latest message is in view port
      requestAnimationFrame(() => {
        scrollToBottom();
      });
      return;
    } else {
      //TODO: This code to wait image loaded to scroll to bottom is working well. But on the UI, it doesn't set data-id for img, Image ant doesn't support.
      const img = document.querySelector(`img[data-id="${latestMessage.id}"]`);
      if (!img) return;

      if ((img as HTMLImageElement).complete) {
        scrollToBottom();
      } else {
        (img as HTMLImageElement).onload = () => {
          scrollToBottom();
        };
      }
    }
  };

  const handleSendMessage = (
    content: string,
    type: MessageType,
    metadata: any,
    user: User | null | undefined,
    replyTo?: Message | null,
  ) => {
    const message = createLocalMessage(content, type, metadata, user, replyTo);
    addMessage(message);

    handleUserStopTyping();

    sendMessageToSocket(
      {
        conversationId: rawConversationId,
        message: {
          content,
          type,
          metadata,
          replyToId: getId(replyTo?.id),
        },
      },
      (res: any) => {
        if (res?.success && res?.messageId) {
          removeMessage(message.id);
          const realMessage: Message = {
            ...message,
            id: res.messageId,
            status: MessageStatus.SENT,
          };
          addMessage(realMessage);
        } else {
          updateMessage(message.id, { status: MessageStatus.FAILED });
        }
      },
    );

    //callback this event to clear chat input after send message success
    onEndSendMessage?.(message);

    scrollToBottomNextFrame(message);
  };

  const handleSubmitInput = (messageId: string, inputValue: string) => {
    submitInputToSocket(messageId, inputValue, (res: any) => {
      if (res?.success && res?.message) {
        updateMessage(res?.message, { metadata: res?.message?.metadata });
      }
    });
  };

  // Prefetch user profiles for messages to warm ProfileCache
  useEffect(() => {
    const idsToFetch = new Set<string>();
    for (const m of messages) {
      const id = m.user?.id;
      if (!id) continue;
      if (!ProfileCache.has('USER', id)) {
        idsToFetch.add(id);
      }
    }
    if (idsToFetch.size === 0) return;

    idsToFetch.forEach(async (id) => {
      try {
        const res: any = await dispatch(fetchUserProfileCard({ id }));
        const data = res.payload as {
          firstName?: string;
          lastName?: string;
          email?: string;
          avatar?: string;
        };
        const normalized = {
          name: `${data?.firstName ?? ''} ${data?.lastName ?? ''}`.trim(),
          email: data?.email,
          avatar: data?.avatar,
        };
        ProfileCache.set('USER', id, normalized);
      } catch (e) {
        // ignore individual prefetch failures
      }
    });
  }, [messages, dispatch]);

  useEffect(() => {
    const handleIncomingMessage = (rawData: any) => {
      if (rawData.conversationId !== rawConversationId) return;

      const message = parseGraphQLMessage(rawData);
      addMessage(message);
      if (isUserAtBottom) {
        scrollToBottomNextFrame(message);
      } else {
        setHasNewMessage(true);
      }
      // notify new message if user is not active tab
      notifyNewMessage();
    };
    eventBus.on(EVENTBUS_INBOX_MESSAGE, handleIncomingMessage);
    return () => {
      eventBus.off(EVENTBUS_INBOX_MESSAGE, handleIncomingMessage);
    };
  }, [rawConversationId, isUserAtBottom]);

  useEffect(() => {
    if (isUserAtBottom) {
      setHasNewMessage(false);
    }
  }, [isUserAtBottom]);

  //TODO: check unread when has incoming message
  useEffect(() => {
    if (rawConversationId) {
      openConversation(rawConversationId);
    }

    return () => {
      if (rawConversationId) {
        closeConversation(rawConversationId);
      }
    };
  }, [rawConversationId]);

  return {
    messages,
    sendMessage: handleSendMessage,
    submitInput: handleSubmitInput,
    scrollToNewMessages: scrollToBottom,
    hasNewMessage,
    isFetchingInitial,
    isLoadingNext,
    handleUserTyping,
    isSomeoneTyping,
  };
}
