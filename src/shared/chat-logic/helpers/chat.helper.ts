import { MessageSender, MessageStatus, MessageType } from '../enums/chat.enums';
import { Message, User } from '../interfaces/inbox';
import { v4 as uuidv4 } from 'uuid';

export function parseEnum<T extends Record<string, string | number>>(
  enumObj: T,
  value?: string,
): T[keyof T] | undefined {
  if (!value) return undefined;

  const enumValues = Object.values(enumObj);
  return enumValues.includes(value) ? (value as T[keyof T]) : undefined;
}

export function parseGraphQLMessage(node: any): Message {
  let parsedMetadata = node.metadata;
  if (typeof node.metadata === 'string') {
    try {
      parsedMetadata = JSON.parse(node.metadata);
    } catch (error) {
      parsedMetadata = undefined;
    }
  }
  const message = {
    id: node.rawId || node.id,
    content: node.content,
    sender:
      parseEnum(MessageSender, node.sender?.toLowerCase()) ??
      MessageSender.GUEST,
    createdAt: node.createdAt,
    updatedAt: node.updatedAt ?? node.createdAt,
    metadata: parsedMetadata ?? undefined,
    user: node.user
      ? {
          id: node.user.id,
          firstName: node.user.firstName,
          lastName: node.user.lastName,
          avatar: node.user.avatar,
          email: node.user.email,
        }
      : null,
    type: parseEnum(MessageType, node.type?.toLowerCase()) ?? MessageType.TEXT,
    status:
      parseEnum(MessageStatus, node.status?.toLowerCase()) ??
      MessageStatus.SENT,
  };

  return message;
}

export function createLocalMessage(
  content: string,
  type: MessageType,
  metadata: any,
  user: User | null | undefined,
): Message {
  const now = new Date();
  const temp_id = now.toISOString();
  const isAgent = user?.id ? true : false;
  const newMessage: Message = {
    id: temp_id,
    content,
    sender: isAgent ? MessageSender.AGENT : MessageSender.GUEST,
    user: !!user?.id
      ? {
          id: user?.id,
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar,
          email: user.email,
        }
      : null,
    type: type,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    metadata,
    status: MessageStatus.SENDING,
  };

  return newMessage;
}

export function createLoadingMessage(): Message {
  const now = new Date();
  const newMessage: Message = {
    id: uuidv4(),
    content: '',
    sender: MessageSender.SYSTEM,
    user: null,
    type: MessageType.LOADING,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    metadata: undefined,
    status: MessageStatus.SENT,
  };

  return newMessage;
}
