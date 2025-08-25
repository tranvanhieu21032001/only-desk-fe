import { Contact, Message } from "../chat-logic";
import { User } from "./user.interface";

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
