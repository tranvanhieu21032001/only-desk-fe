import { Conversation } from '@/shared/chat-logic';

export function parseGraphQLConversation(node: any): Conversation {
  let parsedMetadata = node.metadata;
  if (typeof node.metadata === 'string') {
    try {
      parsedMetadata = JSON.parse(node.metadata);
    } catch (error) {
      parsedMetadata = undefined;
    }
  }
  const conversation = {
    id: node.id,
    rawId: node.rawId,
    contact: {
      id: node.contact.id,
      rawId: node.contact.rawId,
      avatar: node.contact.avatar,
      name: node.contact.name,
      email: node.contact.email,
      context: node.contact.context,
      isOnline: node.contact.isOnline,
      createdAt: node.contact.createdAt,
      updatedAt: node.contact.updatedAt ?? node.contact.createdAt,
    },
    lastActivityAt: node.lastActivityAt,
    metadata: parsedMetadata ?? undefined,
    latestMessage: node.latestMessage
      ? {
          id: node.latestMessage.id,
          content: node.latestMessage.content,
          type: node.latestMessage.type,
        }
      : null,
    assignedTo: node.assignedTo
      ? {
          id: node.assignedTo.id,
        }
      : null,
    resolved: node.resolved,
    unreadCount: node.unreadCount,
  };

  return conversation;
}
