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
      guestId: node.contact.guestId || '',
      notification: node.contact.notification || false,
      segments: node.contact.segments || [],
      lastActivityAt: node.contact.lastActivityAt || node.lastActivityAt,
    },
    lastActivityAt: node.lastActivityAt,
    metadata: parsedMetadata ?? undefined,
    latestMessage: node.latestMessage
      ? {
          id: node.latestMessage.id,
          content: node.latestMessage.content,
          type: node.latestMessage.type,
          createdAt: node.latestMessage.createdAt || '',
          updatedAt: node.latestMessage.updatedAt || '',
          sender: node.latestMessage.sender,
          user: node.latestMessage.user || null,
          status: node.latestMessage.status,
          metadata: node.latestMessage.metadata,
        }
      : undefined,
    assignedTo: node.assignedTo?.id || null,
    participants: node.participants?.map((p: any) => p.id) || [],
    resolved: node.resolved,
    unreadCount: node.unreadCount,
  };

  return conversation;
}

export const getLatestMessageContent = (conversation: Conversation) => {
  if (!conversation.latestMessage) return 'No message';

  // Remove HTML tags from content
  const cleanContent = conversation.latestMessage.content
    .replace(/<[^>]*>/g, '')
    .trim();

  // If content is empty after cleaning, show message type
  if (!cleanContent) {
    return conversation.latestMessage.type || 'Message';
  }

  if (cleanContent.length > 30) {
    return cleanContent.slice(0, 30) + '...';
  }
  return cleanContent;
};
