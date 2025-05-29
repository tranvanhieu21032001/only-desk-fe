import {
  InboxMessageStatus,
  InboxMessageType,
  InboxSender,
} from '@/modules/settings/helpers/enums/inbox.enums';

export interface Contact {
  id: string;
  createdAt: string;
  updatedAt: string;
  guestId: string;
  name: string;
  notification: boolean;
  segments: string[];
  isOnline: boolean;
  lastActivityAt: string;
  workspaceId: string;
  avatar?: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

export interface Message {
  id: string;
  createdAt: string;
  updatedAt: string;
  content: string;
  sender: InboxSender;
  user: User | null;
  type: InboxMessageType;
  status: InboxMessageStatus;
  metadata?: {
    fileUrl?: string;
  };
}

export interface Conversation {
  id: string;
  contact: Contact;
  assignedTo: null | string;
  participants: string[];
  status: string;
  lastActivityAt: string;
  latestMessage: Message;
  unreadGuestCount?: number;
}

export interface ConversationListResponse {
  data: Conversation[];
  total: number;
  page: number;
  hasNextPage: boolean;
}

export interface MessageListResponse {
  data: Message[];
  total: number;
  page: number;
  hasNextPage: boolean;
}
