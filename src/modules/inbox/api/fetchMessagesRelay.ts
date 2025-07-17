import { fetchQuery } from 'react-relay';

import { decodeGlobalId } from '@/shared/utils/decode';
import environment from '@/relay/RelayEnvironment';
import { messageQuery } from '@/relay/MessageQuery';
import { Message } from '../interfaces/inbox';
import {
  InboxMessageType,
  InboxSender,
  InboxMessageStatus,
} from '@/modules/settings/helpers/enums/inbox.enums';

interface MessageListResponse {
  data: Message[];
  hasNextPage: boolean;
  endCursor: string | null;
}

const mapSender = (sender: string): InboxSender =>
  sender === 'GUEST' ? InboxSender.Guest : InboxSender.Agent;

const mapType = (type: string): InboxMessageType => {
  switch (type) {
    case 'IMAGE':
      return InboxMessageType.Image;
    case 'NOTE':
      return InboxMessageType.Note;
    default:
      return InboxMessageType.Text;
  }
};

const mapStatus = (status: string): InboxMessageStatus => {
  switch (status) {
    case 'FAILED':
      return InboxMessageStatus.Failed;
    case 'SENDING':
      return InboxMessageStatus.Sending;
    default:
      return InboxMessageStatus.Sent;
  }
};

export const fetchMessagesRelay = async (
  conversationId: string,
  limit: number,
  beforeCursor: string | null,
): Promise<MessageListResponse> => {
  const rawConversationId = decodeGlobalId(conversationId);

  const variables: any = {
    conversationId: rawConversationId,
    last: limit,
    before: beforeCursor,
  };

  const data: any = await fetchQuery(environment, messageQuery, variables).toPromise();

  const edges = data?.messages?.edges || [];
  const pageInfo = data?.messages?.pageInfo || { hasPreviousPage: false, startCursor: null };

  const messages: Message[] = edges.map((edge: any) => {
    const node = edge.node;
    return {
      id: node.id,
      content: node.content,
      sender: mapSender(node.sender),
      createdAt: node.createdAt,
      updatedAt: node.updatedAt ?? node.createdAt,
      metadata: node.metadata ?? undefined,
      user: node.user
        ? {
            id: node.user.id,
            firstName: node.user.firstName,
            lastName: node.user.lastName,
            avatar: node.user.avatar,
          }
        : null,
      type: mapType(node.type),
      status: mapStatus(node.status),
    };
  });

  return {
    data: messages.reverse(), 
    hasNextPage: pageInfo.hasPreviousPage,
    endCursor: pageInfo.startCursor,
  };
}; 