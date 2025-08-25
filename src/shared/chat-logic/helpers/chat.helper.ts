import { User } from '@/shared/interfaces/user.interface';
import { MessageSender, MessageStatus, MessageType } from '../enums/chat.enums';
import { Message } from '../interfaces/inbox';

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

export const decodeGlobalId = (globalId: string): string => {
  try {
    const decoded = atob(globalId);
    const parts = decoded.split(':');
    return parts[1] || globalId;
  } catch {
    return globalId;
  }
};

export const getId = (id: string | null | undefined) => {
  if (!id) return null;

  if (/^[a-f\d]{24}$/i.test(id)) {
    return id;
  }

  // Attempt to decode Relay ID (Base64)
  try {
    const decoded = atob(id); // Base64 decode
    const parts = decoded.split(':');
    const possibleId = parts[1];

    if (/^[a-f\d]{24}$/i.test(possibleId)) {
      return possibleId;
    }
  } catch (e) {
    // Not a valid Base64 string or unexpected format
    return null;
  }

  // Not recognized
  return null;
};

export const markTimestamps = (messages: Message[]) => {
  const result = [];
  let lastShownTime: Date | null = null;

  for (let i = messages.length - 1; i >= 0; i--) {
    const msg = messages[i];
    const currentTime = new Date(msg.createdAt);

    let showTime = msg.showTime || false; // Preserve existing showTime
    let showDate = msg.showDate || false; // Preserve existing showDate

    if (!lastShownTime) {
      showTime = true;
      showDate = true;
    } else {
      const diffSender = msg.sender !== messages[i + 1]?.sender;
      const diffMinutes =
        (currentTime.getTime() - lastShownTime.getTime()) / 1000 / 60;

      const isDifferentDay =
        currentTime.getFullYear() !== lastShownTime.getFullYear() ||
        currentTime.getMonth() !== lastShownTime.getMonth() ||
        currentTime.getDate() !== lastShownTime.getDate();

      if (diffMinutes > 3 || isDifferentDay || diffSender) {
        showTime = true;
        showDate = isDifferentDay || showDate; // Keep existing showDate if already true
      }
    }

    if (showTime) {
      lastShownTime = currentTime;
    }

    result.push({
      ...msg,
      showTime,
      showDate,
    });
  }

  return result.reverse();
};

export const getSenderName = (msg: Message): string => {
  if (msg.sender === MessageSender.SYSTEM) return 'Only Chat';

  const firstName = msg.user?.firstName ?? '';
  const lastName = msg.user?.lastName ?? '';
  const fullName = `${firstName} ${lastName}`.trim();

  return fullName || 'Guest';
};
