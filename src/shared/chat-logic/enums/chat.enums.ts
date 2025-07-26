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
  FILE = 'file',
  IMAGE = 'image',
  SYSTEM = 'system',
  NOTE = 'note',
  RESOLVED = 'resolved',
  LOADING = 'loading',
}
