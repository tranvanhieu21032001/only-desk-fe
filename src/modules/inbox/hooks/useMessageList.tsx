import { useEffect, useCallback, useMemo, useRef } from 'react';
import {
  commitLocalUpdate,
  ConnectionHandler,
  useLazyLoadQuery,
  usePaginationFragment,
} from 'react-relay';
import { RecordSourceSelectorProxy } from 'relay-runtime';
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

interface UseMessageListProps {
  conversationId: string | null;
}

const MESSAGE_LIMIT = 20;

const EMPTY_RESULT = {
  messages: [],
  loading: false,
  loadingMore: false,
  error: null,
  hasNextPage: false,
  loadMore: () => {},
  addMessage: () => {},
  updateMessage: () => {},
  removeMessage: () => {},
} as const;

function isValidMessage(msg: Message): boolean {
  if (!msg || !msg.type) return false;
  if (
    msg.type === InboxMessageType.Text ||
    msg.type === InboxMessageType.Note
  ) {
    return !!msg.content && msg.content.trim() !== '';
  }
  if (msg.type === InboxMessageType.Image) {
    return !!msg.metadata?.fileUrl;
  }
  if (msg.type === InboxMessageType.Loading) {
    return true;
  }
  return false;
}

const mapSender = (sender: string): InboxSender => {
  if (!sender) {
    return InboxSender.Guest;
  }

  const senderLower = sender.toString().toLowerCase();

  const isGuest =
    senderLower === 'guest' ||
    senderLower === 'user' ||
    senderLower === 'customer' ||
    senderLower === 'visitor';

  const isAgent =
    senderLower === 'agent' ||
    senderLower === 'admin' ||
    senderLower === 'support' ||
    senderLower === 'staff';

  let result: InboxSender;
  if (isGuest) {
    result = InboxSender.Guest;
  } else if (isAgent) {
    result = InboxSender.Agent;
  } else {
    result = InboxSender.Guest;
  }

  return result;
};

const mapType = (type: string): InboxMessageType => {
  if (!type) {
    return InboxMessageType.Text;
  }

  const typeUpper = type.toString().toUpperCase();
  const typeLower = type.toString().toLowerCase();

  let result: InboxMessageType;

  if (
    typeUpper === 'IMAGE' ||
    typeLower === 'image' ||
    typeUpper === 'IMG' ||
    typeLower === 'img' ||
    typeUpper === 'PHOTO' ||
    typeLower === 'photo'
  ) {
    result = InboxMessageType.Image;
  } else if (
    typeUpper === 'NOTE' ||
    typeLower === 'note' ||
    typeUpper === 'PRIVATE' ||
    typeLower === 'private'
  ) {
    result = InboxMessageType.Note;
  } else if (typeUpper === 'LOADING' || typeLower === 'loading') {
    result = InboxMessageType.Loading;
  } else if (
    typeUpper === 'TEXT' ||
    typeLower === 'text' ||
    typeUpper === 'MESSAGE' ||
    typeLower === 'message'
  ) {
    result = InboxMessageType.Text;
  } else {
    result = InboxMessageType.Text;
  }

  return result;
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

export function useMessageList({ conversationId }: UseMessageListProps) {
  const user = useUser();
  const currentUserId = user?.id;

  if (!conversationId) {
    return EMPTY_RESULT;
  }

  const stableConversationId = useRef<string | null>(null);
  const hookCallCount = useRef(0);
  hookCallCount.current++;

  if (stableConversationId.current !== conversationId) {
    // const wasNull = stableConversationId.current === null;
    // const becomingNull = conversationId === null;

    stableConversationId.current = conversationId;
  }

  const rawConversationId = useMemo(
    () => decodeGlobalId(stableConversationId.current!),
    [stableConversationId.current],
  );

  const loadedConversations = useRef(new Set<string>());
  // const isFirstTimeLoading = !loadedConversations.current.has(rawConversationId);

  const prevConversationId = useRef<string | null>(null);
  const renderCount = useRef(0);

  if (prevConversationId.current !== rawConversationId) {
    renderCount.current++;

    prevConversationId.current = rawConversationId;
  }

  const queryVariables = useMemo(
    () => ({
      conversationId: rawConversationId,
      first: MESSAGE_LIMIT,
      after: null,
    }),
    [rawConversationId],
  );

  const lastQueryKey = useRef<string>('');
  const currentQueryKey = JSON.stringify(queryVariables);
  const shouldQuery = lastQueryKey.current !== currentQueryKey;

  if (shouldQuery) {
    lastQueryKey.current = currentQueryKey;
  }

  const queryData = useLazyLoadQuery<ConversationMessagesQuery>(
    conversationMessagesQuery,
    queryVariables,
    {
      fetchPolicy: 'store-or-network',
    },
  );

  useEffect(() => {
    if (!loadedConversations.current.has(rawConversationId)) {
      loadedConversations.current.add(rawConversationId);
    }
  }, [rawConversationId]);

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
      .filter(isValidMessage) || [];

  // Stabilize callback functions
  const loadMore = useCallback(() => {
    if (hasNext && !isLoadingNext) {
      loadNext(MESSAGE_LIMIT);
    }
  }, [hasNext, isLoadingNext, loadNext]);

  // Function to add message to Relay store (stabilized)
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

        // Create a new message record
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
      if (rawData?.type === 'important' || Math.random() < 0.1) {
        console.log(
          '📨 [EventBus] Message received for conversation:',
          rawConversationId,
        );
      }

      let msg: Message;
      try {
        if (rawData.id && rawData.content !== undefined && rawData.sender) {
          msg = rawData as Message;
        } else if (rawData.message) {
          msg = rawData.message as Message;
        } else {
          const senderValue =
            rawData.sender ||
            rawData.from ||
            rawData.author ||
            rawData.userType ||
            rawData.senderType ||
            'GUEST';

          const typeValue =
            rawData.type ||
            rawData.messageType ||
            rawData.msgType ||
            rawData.kind ||
            rawData.category ||
            'TEXT';

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

      if (!isValidMessage(msg)) {
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
      if (!isValidMessage(msg)) return;

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

        if (!messageRecord) {
          console.warn('Message not found in store:', messageId);
          return;
        }

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

        if (!connection) {
          console.warn('Connection not found for removing message');
          return;
        }

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
