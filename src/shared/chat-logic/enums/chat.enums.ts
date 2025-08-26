import { Message } from '../interfaces/inbox';

export enum MessageSender {
  GUEST = 'guest',
  AGENT = 'agent',
  SYSTEM = 'system',
}

export enum MessageStatus {
  SENDING = 'sending',
  SENT = 'sent',
  DELIVERED = 'delivered',
  READ = 'read',
  FAILED = 'failed',
}

export enum MessageType {
  TEXT = 'text',
  INPUT = 'input',
  FILE = 'file',
  IMAGE = 'image',
  SYSTEM = 'system',
  NOTE = 'note',
  REMINDER = 'reminder',
  RESOLVED = 'resolved',
}

export interface MessageInputProps {
  activeTab: string | null;
  selectedReminder: string | null;
  setActiveTab?: (tab: string | null) => void;
  setSelectedReminder?: (reminder: string | null) => void;
  inputValue: string;
  setInputValue: (val: string) => void;
  onSendMessage: (
    val: string,
    type?: MessageType,
    metadata?: any,
    replyTo?: Message | null,
  ) => void;
  onInputChange?: (val: string) => void;
  replyPreview?: Message | null;
  onEndSendMessage?: () => void;
}

export interface FilePreview {
  id: string;
  type: 'image';
  fileUrl: string;
  localUrl: string;
  fileName: string;
  uploading: boolean;
  progress: number;
  originFile?: File;
}
