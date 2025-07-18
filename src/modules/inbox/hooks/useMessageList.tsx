import { useEffect, useCallback, useMemo, useRef } from 'react';
import { RecordSourceSelectorProxy } from 'relay-runtime';
import {
  commitLocalUpdate,
  ConnectionHandler,
  useLazyLoadQuery,
  usePaginationFragment,
} from 'react-relay';

import { messageListFragment } from '@/relay/MessageFragment';
import { conversationMessagesQuery } from '@/relay/ConversationMessagesQuery';
import { Message } from '../interfaces/inbox';
import { eventBus } from '@/core/event-bus';
import { EVENTBUS_INBOX_MESSAGE } from '@/core/settings/constants';
import {
  InboxMessageType,
  InboxMessageStatus,
  InboxSender,
} from '@/modules/settings/helpers/enums/inbox.enums';
import type { ConversationMessagesQuery } from '@/relay/__generated__/ConversationMessagesQuery.graphql';
import type { MessageFragment_query$key } from '@/relay/__generated__/MessageFragment_query.graphql';
import environment from '@/relay/RelayEnvironment';
import { useUser } from '@/core/context/UserContext';
import { decodeGlobalId } from '@/shared/utils/decode';
import { MESSAGE_LIMIT } from '../constants/inbox.constants';

interface UseMessageListProps {
  conversationId: string | null;
}

function mapSender(sender: string): InboxSender {
  if (!sender) {
    return InboxSender.Guest;
  }
  const senderLower = sender.toString().toLowerCase();
  if (senderLower === 'guest') return InboxSender.Guest;
  if (senderLower === 'agent') return InboxSender.Agent;
  return InboxSender.Guest;
}

function mapType(type: string): InboxMessageType {
  if (!type) return InboxMessageType.Text;
  const typeLower = type.toString().toLowerCase();
  if (typeLower === 'image') return InboxMessageType.Image;
  if (typeLower === 'note') return InboxMessageType.Note;
  if (typeLower === 'loading') return InboxMessageType.Loading;
  if (typeLower === 'text') return InboxMessageType.Text;
  return InboxMessageType.Text;
}

function mapStatus(status: string): InboxMessageStatus {
  switch (status) {
    case 'FAILED': return InboxMessageStatus.Failed;
    case 'SENDING': return InboxMessageStatus.Sending;
    default: return InboxMessageStatus.Sent;
  }
}

export function useMessageList({ conversationId }: UseMessageListProps) {
  const user = useUser();
  const currentUserId = user?.id;
  if (!conversationId) {
    return {
      messages: [],
      loading: false,
      loadingMore: false,
      error: null,
      hasNextPage: false,
      loadMore: () => {},
      addMessage: () => {},
      updateMessage: () => {},
      removeMessage: () => {},
    };
  }

  const stableConversationId = useRef<string | null>(null);
  if (stableConversationId.current !== conversationId) {
    stableConversationId.current = conversationId;
  }

  const rawConversationId = useMemo(
    () => decodeGlobalId(stableConversationId.current!),
    [stableConversationId.current],
  );

  const queryVariables = useMemo(
    () => ({
      conversationId: rawConversationId,
      first: MESSAGE_LIMIT,
      after: null,
    }),
    [rawConversationId],
  );

  const queryData = useLazyLoadQuery<ConversationMessagesQuery>(
    conversationMessagesQuery,
    queryVariables,
    {
      fetchPolicy: 'store-or-network',
    },
  );

  const { data, loadNext, hasNext, isLoadingNext } =
    usePaginationFragment<ConversationMessagesQuery, MessageFragment_query$key>(
      messageListFragment,
      queryData,
    );

  const relayMessages: Message[] =
    data?.messages?.edges
      ?.map((edge: any) => {
        const node = edge.node;
        let parsedMetadata = node.metadata;
        if (typeof node.metadata === 'string') {
          try {
            parsedMetadata = JSON.parse(node.metadata);
          } catch (error) {
            parsedMetadata = undefined;
          }
        }
        const message = {
          id: node.id,
          content: node.content,
          sender: mapSender(node.sender),
          createdAt: node.createdAt,
          updatedAt: node.updatedAt ?? node.createdAt,
          metadata: parsedMetadata ?? undefined,
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
        return message;
      })
      || [];

  const loadMore = useCallback(() => {
    if (hasNext && !isLoadingNext) {
      loadNext(MESSAGE_LIMIT);
    }
  }, [hasNext, isLoadingNext, loadNext]);

  const addMessageToStore = useCallback(
    (msg: Message, conversationId: string) => {
      commitLocalUpdate(environment, (store: RecordSourceSelectorProxy) => {
        const root = store.getRoot();
        const connection = ConnectionHandler.getConnection(
          root,
          'MessageFragment_messages',
          { conversationId },
        );
        if (!connection) {
          return;
        }
        const messageRecord = store.create(msg.id, 'Message');
        messageRecord.setValue(msg.id, 'id');
        messageRecord.setValue(msg.content, 'content');
        messageRecord.setValue(msg.sender, 'sender');
        messageRecord.setValue(msg.createdAt, 'createdAt');
        messageRecord.setValue(msg.updatedAt, 'updatedAt');
        messageRecord.setValue(msg.type, 'type');
        messageRecord.setValue(msg.status, 'status');
        messageRecord.setValue(conversationId, 'conversationId');
        if (msg.metadata) {
          const metadataString = JSON.stringify(msg.metadata);
          messageRecord.setValue(metadataString, 'metadata');
        }
        if (msg.user) {
          const userRecord = store.create(`user_${msg.user.id}`, 'User');
          userRecord.setValue(msg.user.id, 'id');
          userRecord.setValue(msg.user.firstName, 'firstName');
          userRecord.setValue(msg.user.lastName, 'lastName');
          userRecord.setValue(msg.user.avatar, 'avatar');
          messageRecord.setLinkedRecord(userRecord, 'user');
        }
        const edge = ConnectionHandler.createEdge(
          store,
          connection,
          messageRecord,
          'MessageTypeEdge',
        );
        ConnectionHandler.insertEdgeBefore(connection, edge);
      });
    },
    [],
  );

  const addMessageToEndOfStore = useCallback(
    (msg: Message, conversationId: string) => {
      commitLocalUpdate(environment, (store: RecordSourceSelectorProxy) => {
        const root = store.getRoot();
        const connection = ConnectionHandler.getConnection(
          root,
          'MessageFragment_messages',
          { conversationId },
        );
        if (!connection) {
          return;
        }
        const messageRecord = store.create(msg.id, 'Message');
        messageRecord.setValue(msg.id, 'id');
        messageRecord.setValue(msg.content, 'content');
        messageRecord.setValue(msg.sender, 'sender');
        messageRecord.setValue(msg.createdAt, 'createdAt');
        messageRecord.setValue(msg.updatedAt, 'updatedAt');
        messageRecord.setValue(msg.type, 'type');
        messageRecord.setValue(msg.status, 'status');
        messageRecord.setValue(conversationId, 'conversationId');
        if (msg.metadata) {
          const metadataString = JSON.stringify(msg.metadata);
          messageRecord.setValue(metadataString, 'metadata');
        }
        if (msg.user) {
          const userRecord = store.create(`user_${msg.user.id}`, 'User');
          userRecord.setValue(msg.user.id, 'id');
          userRecord.setValue(msg.user.firstName, 'firstName');
          userRecord.setValue(msg.user.lastName, 'lastName');
          userRecord.setValue(msg.user.avatar, 'avatar');
          messageRecord.setLinkedRecord(userRecord, 'user');
        }
        const edge = ConnectionHandler.createEdge(
          store,
          connection,
          messageRecord,
          'MessageTypeEdge',
        );
        ConnectionHandler.insertEdgeAfter(connection, edge);
      });
    },
    [],
  );

  useEffect(() => {
    const handleNewMessage = (rawData: any) => {
      let msg: Message;
      try {
        if (rawData.id && rawData.content !== undefined && rawData.sender) {
          msg = rawData as Message;
        } else if (rawData.message) {
          msg = rawData.message as Message;
        } else {
          const senderValue = rawData.sender || 'GUEST';
          const typeValue = rawData.type || 'TEXT';
          msg = {
            id: rawData.id || rawData.messageId || Date.now().toString(),
            content: rawData.content || rawData.text || '',
            sender: mapSender(senderValue),
            createdAt: rawData.createdAt || new Date().toISOString(),
            updatedAt:
              rawData.updatedAt ||
              rawData.createdAt ||
              new Date().toISOString(),
            type: mapType(typeValue),
            status: mapStatus(rawData.status || 'SENT'),
            user: rawData.user || null,
            metadata: rawData.metadata || undefined,
          };
        }
      } catch (error) {
        return;
      }
      const isOwnMessage =
        msg.sender === InboxSender.Agent &&
        msg.user?.id &&
        currentUserId &&
        msg.user.id === currentUserId;
      if (!isOwnMessage) {
        addMessageToStore(msg, rawConversationId);
      }
    };
    eventBus.on(EVENTBUS_INBOX_MESSAGE, handleNewMessage);
    return () => {
      eventBus.off(EVENTBUS_INBOX_MESSAGE, handleNewMessage);
    };
  }, [rawConversationId, addMessageToStore, currentUserId]);

  const addMessage = useCallback(
    (msg: Message) => {
      if (msg.type === InboxMessageType.Loading) {
        addMessageToEndOfStore(msg, rawConversationId);
      } else {
        addMessageToStore(msg, rawConversationId);
      }
    },
    [rawConversationId, addMessageToStore, addMessageToEndOfStore],
  );

  const updateMessage = useCallback(
    (messageId: string, updates: Partial<Message>) => {
      commitLocalUpdate(environment, (store: RecordSourceSelectorProxy) => {
        const messageRecord = store.get(messageId);
        if (!messageRecord) return;
        if (updates.content !== undefined) {
          messageRecord.setValue(updates.content, 'content');
        }
        if (updates.sender !== undefined) {
          messageRecord.setValue(updates.sender, 'sender');
        }
        if (updates.createdAt !== undefined) {
          messageRecord.setValue(updates.createdAt, 'createdAt');
        }
        if (updates.updatedAt !== undefined) {
          messageRecord.setValue(updates.updatedAt, 'updatedAt');
        }
        if (updates.type !== undefined) {
          messageRecord.setValue(updates.type, 'type');
        }
        if (updates.status !== undefined) {
          messageRecord.setValue(updates.status, 'status');
        }
        if (updates.metadata !== undefined) {
          if (updates.metadata) {
            messageRecord.setValue(
              JSON.stringify(updates.metadata),
              'metadata',
            );
          } else {
            messageRecord.setValue(null, 'metadata');
          }
        }
        if (updates.user !== undefined) {
          if (updates.user) {
            const userRecord =
              store.get(`user_${updates.user.id}`) ||
              store.create(`user_${updates.user.id}`, 'User');
            userRecord.setValue(updates.user.id, 'id');
            if (updates.user.firstName !== undefined) {
              userRecord.setValue(updates.user.firstName, 'firstName');
            }
            if (updates.user.lastName !== undefined) {
              userRecord.setValue(updates.user.lastName, 'lastName');
            }
            if (updates.user.avatar !== undefined) {
              userRecord.setValue(updates.user.avatar, 'avatar');
            }
            messageRecord.setLinkedRecord(userRecord, 'user');
          } else {
            messageRecord.setValue(null, 'user');
          }
        }
      });
    },
    [],
  );

  const removeMessage = useCallback(
    (messageId: string) => {
      commitLocalUpdate(environment, (store: RecordSourceSelectorProxy) => {
        const root = store.getRoot();
        const connection = ConnectionHandler.getConnection(
          root,
          'MessageFragment_messages',
          { conversationId: rawConversationId },
        );
        if (!connection) return;
        ConnectionHandler.deleteNode(connection, messageId);
        store.delete(messageId);
      });
    },
    [rawConversationId],
  );

  return {
    messages: relayMessages,
    loading: false,
    loadingMore: isLoadingNext,
    error: null,
    hasNextPage: hasNext,
    loadMore,
    addMessage,
    updateMessage,
    removeMessage,
  };
}
