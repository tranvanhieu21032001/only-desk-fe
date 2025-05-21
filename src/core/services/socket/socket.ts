import { io } from 'socket.io-client';
import { eventBus } from '@/core/event-bus';
import {
  SOCKET_API_URL,
  EVENTBUS_SOCKET_CONNECT,
  EVENTBUS_SOCKET_DISCONNECT,
  EVENTBUS_INBOX_MESSAGE,
} from '@/core/settings/constants';

export const socket = io(SOCKET_API_URL, { autoConnect: false });

export const connectSocket = (auth: any) => {
  socket.auth = auth;
  socket.connect();

  socket.on('connect', () => eventBus.emit(EVENTBUS_SOCKET_CONNECT));
  socket.on('disconnect', () => eventBus.emit(EVENTBUS_SOCKET_DISCONNECT));
  socket.on('message', (data) => eventBus.emit(EVENTBUS_INBOX_MESSAGE, data));
  socket.on('reconnect_error', () => eventBus.emit(EVENTBUS_SOCKET_DISCONNECT));
  socket.on('reconnect_failed', () =>
    eventBus.emit(EVENTBUS_SOCKET_DISCONNECT),
  );

  return () => {
    socket.off('connect');
    socket.off('disconnect');
    socket.off('message');
    socket.off('reconnect_error');
    socket.off('reconnect_failed');
    socket.disconnect();
  };
};

export const disconnectSocket = () => {
  socket.disconnect();
};

export const sendAgentMessage = (data: any, callback?: any) => {
  socket.emit('send_agent_message', data, callback);
};

export const onMessage = (handler: (data: any) => void) => {
  socket.on('message', handler);
  return () => socket.off('message', handler);
};
