export enum MessageSender {
  GUEST = "guest",
  AGENT = "agent",
  SYSTEM = "system",
}

export enum MessageStatus {
  SENDING = "sending",
  SENT = "sent",
  DELIVERED = "delivered",
  READ = "read",
  FAILED = "failed",
}

export enum MessageType {
  TEXT = "text",
  INPUT = "input",
  FILE = "file",
  IMAGE = "image",
  SYSTEM = "system",
  NOTE = "note",
  RESOLVED = "resolved",
}

export interface MessageInputProps {
  activeTab: string | null;
  selectedReminder: string | null;
  inputValue: string;
  setInputValue: (val: string) => void;
  onSendMessage: (
    val: string,
    type?: MessageType,
    replyId?: string,
    metadata?: any,
  ) => void;
  onInputChange?: (val: string) => void;
  replyPreview?: {
    id: string;
    snippet: string;
    type?: MessageType;
    fileUrl?: string;
  } | null;
  onClearReply?: () => void;
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
