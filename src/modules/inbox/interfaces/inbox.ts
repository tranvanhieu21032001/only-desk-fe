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
  email: string;
  notification: boolean;
  segments: string[];
  isOnline: boolean;
  lastActivityAt: string;
  workspaceId: string;
  avatar?: string;
  countryCode?:string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  email:string;
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
  lastActivityAt: string;
  latestMessage: Message;
  unreadGuestCount?: number;
  unreadCount?: number;
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
  formatTime: (date: string) => string;
  pendingImageScroll: boolean;
  setPendingImageScroll: (v: boolean) => void;
  setPendingImageLoads: React.Dispatch<React.SetStateAction<number>>;
  scrollToBottom: () => void;
  justLoadedMore: boolean;
  isOwner: boolean;
  avatarAdmin?: string;
  contactId?: string;
  avatar?:string;
  name?:string;
  countryCode?:string;
}

export interface MessageTimeWithIconProps {
  isOwner: boolean;
  hovered: boolean;
  onMenuClick: (e: React.MouseEvent) => void;
  onHoverEnter: () => void;
  onHoverLeave: () => void;
  createdAt: string;
  status: InboxMessageStatus;
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

export interface ChatMessageItemProps {
  msg: Message;
  hoveredMessageId: string | null;
  contextMenu: any;
  handleIconClick: (e: React.MouseEvent, message: Message) => void;
  setHoveredMessageId: (id: string | null) => void;
  formatTime: (date: string) => string;
  pendingImageScroll: boolean;
  setPendingImageScroll: (v: boolean) => void;
  setPendingImageLoads: React.Dispatch<React.SetStateAction<number>>;
  scrollToBottom: () => void;
  justLoadedMore: boolean;
  isOwner: boolean;
  avatarAdmin?: string;
  contactId?: string;
  avatar?:string;
  name?:string;
  countryCode?:string;
}
