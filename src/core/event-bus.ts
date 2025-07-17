import mitt from 'mitt';

import {
  EVENTBUS_INBOX_MESSAGE,
  EVENTBUS_SOCKET_DISCONNECT,
  EVENTBUS_SOCKET_CONNECT,
  EVENTBUS_USER_TYPING,
  EVENTBUS_USER_STATUS,
} from '@/core/settings/constants';

export type AppEvents = {
  [EVENTBUS_INBOX_MESSAGE]: any;
  [EVENTBUS_SOCKET_DISCONNECT]: void;
  [EVENTBUS_SOCKET_CONNECT]: void;
  [EVENTBUS_USER_TYPING]: any;

  [EVENTBUS_USER_STATUS]: {
    userId?: string;
    contactId?: string;
    workspaceId: string;
    isOnline: boolean;
    lastActivityAt?: string;
  };
};

export const eventBus = mitt<AppEvents>();
