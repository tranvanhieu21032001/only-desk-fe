import { User } from '@/shared/interfaces/user.interface';
import { MessageSender, MessageStatus, MessageType } from '../enums/chat.enums';

export interface Message {
  id: string;
  createdAt: string;
  updatedAt: string;
  content: string;
  sender: MessageSender;
  user: User | null;
  type: MessageType;
  status: MessageStatus;
  metadata?: {
    fileUrl?: string;
    inputType?: string;
    placeholder?: string;
    inputValue?: string;
    reminderTime?:string;
  };
  replyTo?: Message | null;
  showTime?: boolean;
  showDate?: boolean;
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
