import { MessageStatus } from '@/shared/chat-logic/enums/chat.enums';
import { Message } from '@/shared/chat-logic/interfaces/inbox';

export interface Contact {
  id: string;
  rawId: string;
  createdAt: string;
  updatedAt: string;
  guestId: string;
  name: string;
  email: string;
  notification: boolean;
  segments: string[];
  metadata?: {
    [key: string]: any;
  };
  isOnline: boolean;
  lastActivityAt: string;
  workspaceId?: string;
  avatar?: string;
  countryCode?: string;
  countryName?: string;
  city?: string;
  browser?: string;
  os?: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
}

export interface Conversation {
  id: string;
  rawId: string;
  contact: Contact;
  assignedTo: null | string;
  participants: string[];
  lastActivityAt: string;
  latestMessage?: Message;
  resolved?: boolean;
  unreadGuestCount?: number;
  unreadCount?: number;
}

export interface InboxDetailProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  conversation?: any;
}

export interface MessageBaseItemProps {
  msg: Message;
  hoveredMessageId: string | null;
  contextMenu: any;
  handleIconClick: (e: React.MouseEvent, message: Message) => void;
  setHoveredMessageId: (id: string | null) => void;
}

export interface MessageTimeWithIconProps {
  isOwner: boolean;
  hovered: boolean;
  onMenuClick: (e: React.MouseEvent) => void;
  onHoverEnter: () => void;
  onHoverLeave: () => void;
  createdAt: string;
  status: MessageStatus;
  formatTime: (date: string) => string;
  rightIcon?: boolean;
  style?: React.CSSProperties;
}

export interface TabContentProps {
  activeTab: string | null;
  INBOX_TABS: Record<string, string>;
  shortcuts: any[];
  shortcutsLoading: boolean;
  shortcutsListRef: React.RefObject<HTMLDivElement | null>;
  setInputValue: (val: string | ((prev: string) => string)) => void;
  setActiveTab: (tab: string | null) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  inputValue: string;
  setSelectedReminder: (val: string | null) => void;
  t: (key: string) => string;
}

export interface RenderSkeletonProps {
  count?: number;
}
