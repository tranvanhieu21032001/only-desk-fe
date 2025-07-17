import { io } from 'socket.io-client';
import { eventBus } from '@/core/event-bus';
import {
  SOCKET_API_URL,
  EVENTBUS_SOCKET_CONNECT,
  EVENTBUS_SOCKET_DISCONNECT,
  EVENTBUS_INBOX_MESSAGE,
  SOCKET_EVENT_MESSAGE,
  SOCKET_EVENT_SEND_MESSAGE,
  EVENTBUS_USER_TYPING,
  SOCKET_EVENT_USER_STATUS,
  EVENTBUS_USER_STATUS,
} from '@/core/settings/constants';

export const socket = io(SOCKET_API_URL, { autoConnect: false });

export const connectSocket = (auth: any) => {
  socket.auth = auth;
  socket.connect();

  socket.on('connect', () => {
    eventBus.emit(EVENTBUS_SOCKET_CONNECT);
  });

  socket.on('disconnect', () => {
    eventBus.emit(EVENTBUS_SOCKET_DISCONNECT);
  });

  socket.on(SOCKET_EVENT_MESSAGE, (d) => {
    eventBus.emit(EVENTBUS_INBOX_MESSAGE, d);
  });

  socket.on(SOCKET_EVENT_USER_STATUS, (d) => {
    eventBus.emit(EVENTBUS_USER_STATUS, d);
  });

  socket.on('reconnect_error', () =>
    eventBus.emit(EVENTBUS_SOCKET_DISCONNECT),
  );

  socket.on('reconnect_failed', () =>
    eventBus.emit(EVENTBUS_SOCKET_DISCONNECT),
  );

  socket.on('user_typing', (d) =>
    eventBus.emit(EVENTBUS_USER_TYPING, d),
  );

  return () => {
    socket.off('connect');
    socket.off('disconnect');
    socket.off(SOCKET_EVENT_MESSAGE);
    socket.off(SOCKET_EVENT_USER_STATUS);
    socket.off('reconnect_error');
    socket.off('reconnect_failed');
    socket.off('user_typing');
    socket.disconnect();
  };
};

export const disconnectSocket = () => socket.disconnect();

export const sendAgentMessage = (data: any, cb?: any) =>
  socket.emit(SOCKET_EVENT_SEND_MESSAGE, data, cb);

export const openConversation = (conversationId: string) =>
  socket.emit('open_conversation', { conversationId });

export const closeConversation = (conversationId: string) =>
  socket.emit('close_conversation', { conversationId });

export const emitTypingStart = (conversationId: string) =>
  socket.emit('typing_start', { conversationId });

export const emitTypingStop = (conversationId: string) =>
  socket.emit('typing_stop', { conversationId });

export const listenUserTyping = (cb: (d: any) => void) =>
  eventBus.on(EVENTBUS_USER_TYPING, cb);

export const offUserTyping = (cb: (d: any) => void) =>
  eventBus.off(EVENTBUS_USER_TYPING, cb);

export const listenUserStatus = (cb: (d: any) => void) =>
  eventBus.on(EVENTBUS_USER_STATUS, cb);

export const offUserStatus = (cb: (d: any) => void) =>
  eventBus.off(EVENTBUS_USER_STATUS, cb);
