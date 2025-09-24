import { Message } from '../chat-logic';
import { Contact } from './contact.interface';
import { User } from './user.interface';

export interface Conversation {
  id: string;
  rawId: string;
  contact: Contact;
  assignedTo: string | null;
  participants?: (User | string)[];
  lastActivityAt: string;
  latestMessage?: Message;
  resolved?: boolean;
  unreadGuestCount?: number;
  unreadCount?: number;
}

export type LastConversations = Conversation[];
