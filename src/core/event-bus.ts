import mitt from 'mitt';

import {
  EVENTBUS_INBOX_MESSAGE,
  EVENTBUS_SOCKET_DISCONNECT,
  EVENTBUS_SOCKET_CONNECT,
  EVENTBUS_USER_TYPING,
  EVENTBUS_USER_STATUS,
  EVENTBUS_UPDATED_CONVERSATION,
} from '@/core/settings/constants';
import { Conversation } from '@/modules/inbox/interfaces/inbox';

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
  [EVENTBUS_UPDATED_CONVERSATION]: {
    conversationId: string;
    updates: Partial<Conversation>;
  };
};

export const eventBus = mitt<AppEvents>();
