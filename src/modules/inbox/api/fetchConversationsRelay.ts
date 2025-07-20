import { fetchQuery } from 'react-relay';
import environment from '@/relay/RelayEnvironment';
import { conversationListQuery } from '@/relay/ConversationListQuery';
import { Conversation } from '../interfaces/inbox';

interface ConversationListResponse {
  data: Conversation[];
  hasNextPage: boolean;
  endCursor: string | null;
}

export const fetchConversationsRelay = async (
  workspaceId: string,
  limit: number,
  cursor: string | null,
): Promise<ConversationListResponse> => {
  const variables: any = {};

  const data: any = await fetchQuery(environment, conversationListQuery, variables).toPromise();

  const edges = data?.conversations?.edges || [];
  const conversations: Conversation[] = edges.map((edge: any) => {
    const node = edge.node;
    return {
      id: node.id,
      contact: {
        id: node.contact?.id,
        createdAt: '',
        updatedAt: '',
        guestId: '',
        name: node.contact?.name || 'Guest',
        email: node.contact?.email || '',
        notification: true,
        segments: [],
        isOnline: node.contact?.isOnline ?? false,
        lastActivityAt: node.updatedAt,
        workspaceId,
        avatar: node.contact?.avatar || '',
      },
      assignedTo: node.assignedTo?.id || null,
      participants: [],
      lastActivityAt: node.lastActivityAt,
      latestMessage: {
        id: '',
        content: node.latestMessage?.content || '',
        sender: 'agent' as any,
        createdAt: node.updatedAt,
        updatedAt: node.updatedAt,
        type: 'text' as any,
        status: 'sent' as any,
        user: null,
      } as any,
    } as Conversation;
  });

  const pageInfo = data?.conversations?.pageInfo || { hasNextPage: false, endCursor: null };
  return {
    data: conversations,
    hasNextPage: pageInfo.hasNextPage,
    endCursor: pageInfo.endCursor,
  };
}; 