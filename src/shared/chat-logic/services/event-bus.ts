import mitt from 'mitt';
import {
  EVENTBUS_INBOX_MESSAGE,
  EVENTBUS_UPDATED_CONVERSATION,
  EVENTBUS_USER_STATUS,
  EVENTBUS_USER_TYPING,
  EVENTBUS_SERVER_TYPING,
} from '../constants/event-bus.constants';
import { Conversation } from '@/shared/interfaces/conversation.interface';

export type AppEvents = {
  [EVENTBUS_INBOX_MESSAGE]: any;
  [EVENTBUS_USER_TYPING]: any;
  [EVENTBUS_SERVER_TYPING]: any;

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
