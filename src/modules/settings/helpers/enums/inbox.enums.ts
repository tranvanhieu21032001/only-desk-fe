// Sender
export enum InboxSender {
  Guest = 'guest',
  Agent = 'agent',
}

// Message Type
export enum InboxMessageType {
  Text = 'text',
  Image = 'image',
  Note = 'note',
}

// Message Status
export enum InboxMessageStatus {
  Sent = 'sent',
  Sending = 'sending',
  Failed = 'failed',
}
