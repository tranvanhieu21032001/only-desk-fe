import { io } from 'socket.io-client';

const SOCKET_API_URL = import.meta.env.VITE_SOCKET_API_URL;
export const socket = io(SOCKET_API_URL, { autoConnect: true });

export const connectSocket = (
  auth: any,
  onConnect?: () => void,
  onDisconnect?: () => void,
) => {
  socket.auth = auth;
  socket.connect();
  if (onConnect) socket.on('connect', onConnect);
  if (onDisconnect) socket.on('disconnect', onDisconnect);
  return () => {
    if (onConnect) socket.off('connect', onConnect);
    if (onDisconnect) socket.off('disconnect', onDisconnect);
  };
};

export const connectInboxSocket = (
  auth: any,
  onMessage: (data: any) => void,
  onConnect?: () => void,
  onDisconnect?: () => void,
) => {
  socket.auth = auth;
  socket.connect();
  if (onConnect) socket.on('connect', onConnect);
  socket.on('reconnect_attempt', () => console.log('SOCKET RECONNECT ATTEMPT'));
  socket.on('reconnect_error', () => console.log('SOCKET RECONNECT ERROR'));
  socket.on('reconnect_failed', () => console.log('SOCKET RECONNECT FAILED'));
  if (onDisconnect)
    socket.on('disconnect', () => {
      console.log('SOCKET DISCONNECTED');
      onDisconnect();
    });
  socket.on('message', onMessage);

  return () => {
    if (onConnect) socket.off('connect', onConnect);
    if (onDisconnect) socket.off('disconnect', onDisconnect);
    socket.off('message', onMessage);
    socket.disconnect();
    socket.off('reconnect_attempt');
    socket.off('reconnect_error');
    socket.off('reconnect_failed');
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
