import mitt from 'mitt';

import {
  EVENTBUS_INBOX_MESSAGE,
  EVENTBUS_SOCKET_DISCONNECT,
  EVENTBUS_SOCKET_CONNECT,
} from '@/core/settings/constants';

export type AppEvents = {
  [EVENTBUS_INBOX_MESSAGE]: any;
  [EVENTBUS_SOCKET_DISCONNECT]: void;
  [EVENTBUS_SOCKET_CONNECT]: void;
};

export const eventBus = mitt<AppEvents>();
