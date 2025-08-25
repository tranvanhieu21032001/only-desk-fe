import { MessageStatus } from '@/shared/chat-logic/enums/chat.enums';
import { Contact, Message } from '@/shared/chat-logic/interfaces/inbox';

export interface User {
  user?: any;
  id: string;
  rawId?: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  email: string;
}

export interface Conversation {
  id: string;
  rawId: string;
  contact: Contact;
  assignedTo: null | string;
  participants?: (User | string)[];
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
  knowledgeKeyword?: string;
  t: (key: string) => string;
}

export interface RenderSkeletonProps {
  count?: number;
}
