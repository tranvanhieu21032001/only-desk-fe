import {
  EVENTBUS_INBOX_MESSAGE,
  EVENTBUS_UPDATED_CONVERSATION,
  EVENTBUS_USER_STATUS,
  EVENTBUS_USER_TYPING,
  EVENTBUS_SERVER_TYPING,
} from '../constants/event-bus.constants';
import {
  SOCKET_RECEIVE_EVENT_MESSAGE,
  SOCKET_RECEIVE_EVENT_UPDATED_CONVERSATION,
  SOCKET_RECEIVE_EVENT_USER_STATUS,
  SOCKET_RECEIVE_EVENT_USER_TYPING,
  SOCKET_RECEIVE_EVENT_SERVER_TYPING,
  SOCKET_SEND_EVENT_CLOSE_CONVERSATION,
  SOCKET_SEND_EVENT_OPEN_CONVERSATION,
  SOCKET_SEND_EVENT_SEND_MESSAGE,
  SOCKET_SEND_EVENT_TYPING_START,
  SOCKET_SEND_EVENT_TYPING_STOP,
  SOCKET_SEND_EVENT_GUEST_SUBMIT_INPUT,
} from '../constants/socket.constants';

import { Socket } from 'socket.io-client';
import { AppEvents, eventBus } from './event-bus';

let socketInstance: Socket | null = null;

const socketEventMappings: [string, keyof AppEvents][] = [
  [SOCKET_RECEIVE_EVENT_MESSAGE, EVENTBUS_INBOX_MESSAGE],
  [SOCKET_RECEIVE_EVENT_UPDATED_CONVERSATION, EVENTBUS_UPDATED_CONVERSATION],
  [SOCKET_RECEIVE_EVENT_USER_STATUS, EVENTBUS_USER_STATUS],
  [SOCKET_RECEIVE_EVENT_USER_TYPING, EVENTBUS_USER_TYPING],
  [SOCKET_RECEIVE_EVENT_SERVER_TYPING, EVENTBUS_SERVER_TYPING],
];

export const setupChatSocket = (socket: Socket) => {
  socketInstance = socket;

  // Listen all mapped socket events
  socketEventMappings.forEach(([socketEvent, busEvent]) => {
    console.log('Listening to socket event', socketEvent);
    socket.on(socketEvent, (data) => eventBus.emit(busEvent, data));
  });

  // Return cleanup function
  return () => {
    socketEventMappings.forEach(([socketEvent]) => {
      console.log('Removing socket event', socketEvent);
      socket.off(socketEvent);
    });
  };
};

const getSocket = (): Socket => {
  if (!socketInstance) throw new Error('Socket not initialized');
  return socketInstance;
};

interface SendMessageSocketPayload {
  conversationId: string | null;
  message: {
    content: string;
    type: string;
    metadata: any;
    replyToId?: string | null;
  };
}

export const sendMessageToSocket = (data: SendMessageSocketPayload, cb?: any) =>
  getSocket().emit(SOCKET_SEND_EVENT_SEND_MESSAGE, data, cb);

export const openConversation = (conversationId: string) => {
  console.log('openConversation', conversationId);
  getSocket().emit(SOCKET_SEND_EVENT_OPEN_CONVERSATION, { conversationId });
};

export const closeConversation = (conversationId: string) => {
  console.log('closeConversation', conversationId);
  getSocket().emit(SOCKET_SEND_EVENT_CLOSE_CONVERSATION, { conversationId });
};

export const submitInputToSocket = (
  messageId: string,
  inputValue: string,
  cb?: any,
) => {
  console.log('submitInputToSocket', messageId, inputValue);
  getSocket().emit(
    SOCKET_SEND_EVENT_GUEST_SUBMIT_INPUT,
    {
      messageId,
      inputValue,
    },
    cb,
  );
};

export const emitTypingStart = (conversationId: string) => {
  console.log('emitTypingStart', conversationId);
  getSocket().emit(SOCKET_SEND_EVENT_TYPING_START, { conversationId });
};

export const emitTypingStop = (conversationId: string) => {
  console.log('emitTypingStop', conversationId);
  getSocket().emit(SOCKET_SEND_EVENT_TYPING_STOP, { conversationId });
};

export const listenUserStatus = (cb: (d: any) => void) =>
  eventBus.on(EVENTBUS_USER_STATUS, cb);

export const offUserStatus = (cb: (d: any) => void) =>
  eventBus.off(EVENTBUS_USER_STATUS, cb);
