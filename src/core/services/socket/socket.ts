import { io } from 'socket.io-client';
import { eventBus } from '@/core/event-bus';
import {
  SOCKET_API_URL,
  EVENTBUS_SOCKET_CONNECT,
  EVENTBUS_SOCKET_DISCONNECT,
} from '@/core/settings/constants';
import { setupChatSocket } from '@/shared/chat-logic/services/socket';

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

  socket.on('reconnect_error', () => eventBus.emit(EVENTBUS_SOCKET_DISCONNECT));

  socket.on('reconnect_failed', () =>
    eventBus.emit(EVENTBUS_SOCKET_DISCONNECT),
  );

  setupChatSocket(socket);

  return () => {
    socket.off('connect');
    socket.off('disconnect');
    socket.off('reconnect_error');
    socket.off('reconnect_failed');
    socket.disconnect();
  };
};

export const disconnectSocket = () => socket.disconnect();
