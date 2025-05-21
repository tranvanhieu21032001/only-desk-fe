import { io } from 'socket.io-client';
import { eventBus } from '@/core/event-bus';

import {
  SOCKET_API_URL,
  SOCKET_EVENT_CONNECT,
  SOCKET_EVENT_DISCONNECT,
  SOCKET_EVENT_MESSAGE,
  SOCKET_EVENT_RECONNECT_ATTEMPT,
  SOCKET_EVENT_RECONNECT_ERROR,
  SOCKET_EVENT_RECONNECT_FAILED,
  EVENTBUS_SOCKET_CONNECT,
  EVENTBUS_SOCKET_DISCONNECT,
  EVENTBUS_INBOX_MESSAGE,
  EVENTBUS_SOCKET_RECONNECT_ATTEMPT,
  EVENTBUS_SOCKET_RECONNECT_ERROR,
  EVENTBUS_SOCKET_RECONNECT_FAILED,
  SOCKET_EVENT_SEND_AGENT_MESSAGE,
} from '@/core/settings/constants';

export const socket = io(SOCKET_API_URL, { autoConnect: false });

export const connectSocket = (
  auth: any,
  onConnect?: () => void,
  onDisconnect?: () => void,
) => {
  socket.auth = auth;
  socket.connect();
  if (onConnect) socket.on(SOCKET_EVENT_CONNECT, onConnect);
  if (onDisconnect) socket.on(SOCKET_EVENT_DISCONNECT, onDisconnect);
  return () => {
    if (onConnect) socket.off(SOCKET_EVENT_CONNECT, onConnect);
    if (onDisconnect) socket.off(SOCKET_EVENT_DISCONNECT, onDisconnect);
  };
};

export const connectInboxSocket = (auth: any) => {
  socket.auth = auth;
  socket.connect();

  socket.on(SOCKET_EVENT_CONNECT, () => eventBus.emit(EVENTBUS_SOCKET_CONNECT));
  socket.on(SOCKET_EVENT_DISCONNECT, () =>
    eventBus.emit(EVENTBUS_SOCKET_DISCONNECT),
  );
  socket.on(SOCKET_EVENT_MESSAGE, (data) =>
    eventBus.emit(EVENTBUS_INBOX_MESSAGE, data),
  );
  socket.on(SOCKET_EVENT_RECONNECT_ATTEMPT, () =>
    eventBus.emit(EVENTBUS_SOCKET_RECONNECT_ATTEMPT),
  );
  socket.on(SOCKET_EVENT_RECONNECT_ERROR, () =>
    eventBus.emit(EVENTBUS_SOCKET_RECONNECT_ERROR),
  );
  socket.on(SOCKET_EVENT_RECONNECT_FAILED, () =>
    eventBus.emit(EVENTBUS_SOCKET_RECONNECT_FAILED),
  );

  return () => {
    socket.off(SOCKET_EVENT_CONNECT);
    socket.off(SOCKET_EVENT_DISCONNECT);
    socket.off(SOCKET_EVENT_MESSAGE);
    socket.off(SOCKET_EVENT_RECONNECT_ATTEMPT);
    socket.off(SOCKET_EVENT_RECONNECT_ERROR);
    socket.off(SOCKET_EVENT_RECONNECT_FAILED);
    socket.disconnect();
  };
};

export const disconnectSocket = () => {
  socket.disconnect();
};

export const sendAgentMessage = (data: any, callback?: any) => {
  socket.emit(SOCKET_EVENT_SEND_AGENT_MESSAGE, data, callback);
};

export const onMessage = (handler: (data: any) => void) => {
  socket.on(SOCKET_EVENT_MESSAGE, handler);
  return () => socket.off(SOCKET_EVENT_MESSAGE, handler);
};
