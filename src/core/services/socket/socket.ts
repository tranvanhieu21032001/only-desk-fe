import { io } from 'socket.io-client';
import { eventBus } from '@/core/event-bus';
import {
  SOCKET_API_URL,
  EVENTBUS_SOCKET_CONNECT,
  EVENTBUS_SOCKET_DISCONNECT,
  EVENTBUS_INBOX_MESSAGE,
  SOCKET_EVENT_SEND_AGENT_MESSAGE,
  SOCKET_EVENT_MESSAGE,
} from '@/core/settings/constants';

export const socket = io(SOCKET_API_URL, { autoConnect: false });

export const connectSocket = (auth: any) => {
  socket.auth = auth;
  socket.connect();

  socket.on('connect', () => eventBus.emit(EVENTBUS_SOCKET_CONNECT));
  socket.on('disconnect', () => eventBus.emit(EVENTBUS_SOCKET_DISCONNECT));
  socket.on(SOCKET_EVENT_MESSAGE, (data) =>
    eventBus.emit(EVENTBUS_INBOX_MESSAGE, data),
  );
  socket.on('reconnect_error', () => eventBus.emit(EVENTBUS_SOCKET_DISCONNECT));
  socket.on('reconnect_failed', () =>
    eventBus.emit(EVENTBUS_SOCKET_DISCONNECT),
  );

  return () => {
    socket.off('connect');
    socket.off('disconnect');
    socket.off(SOCKET_EVENT_MESSAGE);
    socket.off('reconnect_error');
    socket.off('reconnect_failed');
    socket.disconnect();
  };
};

export const disconnectSocket = () => {
  socket.disconnect();
};

export const sendAgentMessage = (data: any, callback?: any) => {
  socket.emit(SOCKET_EVENT_SEND_AGENT_MESSAGE, data, callback);
};
