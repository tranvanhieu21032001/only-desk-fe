import { commitLocalUpdate } from 'react-relay';
import { ConnectionHandler, RecordSourceSelectorProxy } from 'relay-runtime';
import type { RecordProxy } from 'relay-runtime';

import environment from '@/relay/RelayEnvironment';
import { Conversation } from '@/shared/interfaces/conversation.interface';
import { ConversationFilterEnum } from '@/shared/helper/enums/common';

export interface ConversationConnectionFilters {
  isAssignedToMe: boolean;
  filter?: ConversationFilterEnum;
  keyword?: string | null;
}

interface ConversationConnectionContext {
  store: RecordSourceSelectorProxy;
  connection: RecordProxy;
}

const CONNECTION_KEY = 'ConversationFragment_conversations';

const buildConnectionArguments = ({
  isAssignedToMe,
  filter,
  keyword,
}: ConversationConnectionFilters): Record<string, unknown> => {
  const connectionArguments: Record<string, unknown> = {
    assignedToMe: isAssignedToMe,
  };

  if (filter) {
    connectionArguments.filter = filter;
  }

  if (keyword) {
    connectionArguments.keyword = keyword;
  }

  return connectionArguments;
};

const updateConversationConnection = (
  filters: ConversationConnectionFilters,
  updater: (context: ConversationConnectionContext) => void,
) => {
  commitLocalUpdate(environment, (store: RecordSourceSelectorProxy) => {
    const root = store.getRoot();
    const connectionArguments = buildConnectionArguments(filters);

    const connection = ConnectionHandler.getConnection(
      root,
      CONNECTION_KEY,
      connectionArguments,
    );

    if (!connection) return;

    updater({ store, connection });
  });
};

const addOrMoveConversationToTop = (
  conversation: Conversation,
  filters: ConversationConnectionFilters,
) => {
  updateConversationConnection(filters, ({ store, connection }) => {
    const conversationId = conversation.id;
    const edges = connection.getLinkedRecords('edges');

    // Check if conversation already exists in the list
    const existingEdgeIndex = edges?.findIndex((edge) => {
      const node = edge.getLinkedRecord('node');
      return node?.getDataID() === conversationId;
    });

    // If conversation exists, check if it's already at top
    if (existingEdgeIndex !== undefined && existingEdgeIndex >= 0) {
      if (existingEdgeIndex === 0) {
        // Already at top, relay will automatically update the data
        return;
      }

      // Remove from current position
      const existingEdge = edges?.[existingEdgeIndex];
      ConnectionHandler.deleteNode(connection, conversationId);

      // Add to top
      if (existingEdge) {
        ConnectionHandler.insertEdgeBefore(connection, existingEdge);
      }
    } else {
      //TODO: need to check new conversation is assigned to me if isAssignedToMe is true

      // Conversation doesn't exist in connection, get existing record or create new one
      let conversationRecord = store.get(conversationId);
      if (!conversationRecord) {
        conversationRecord = store.create(conversationId, 'Conversation');
      }
      Object.keys(conversation).forEach((key) => {
        const value = (conversation as any)[key];
        if (value !== undefined) {
          if (key === 'contact' && value && typeof value === 'object') {
            // Create contact record
            const contactRecord =
              store.get(value.id) || store.create(value.id, 'Contact');
            Object.keys(value).forEach((contactKey) => {
              if (contactKey === 'context') {
                // Skip context for now since it's causing issues
                return;
              } else if (
                value[contactKey] !== undefined &&
                typeof value[contactKey] !== 'object'
              ) {
                contactRecord.setValue(value[contactKey], contactKey);
              }
            });
            conversationRecord.setLinkedRecord(contactRecord, 'contact');
          } else if (
            key === 'assignedTo' &&
            value &&
            typeof value === 'object'
          ) {
            // Create assignedTo record
            const userRecord =
              store.get(value.id) || store.create(value.id, 'User');
            Object.keys(value).forEach((userKey) => {
              if (
                value[userKey] !== undefined &&
                typeof value[userKey] !== 'object'
              ) {
                userRecord.setValue(value[userKey], userKey);
              }
            });
            conversationRecord.setLinkedRecord(userRecord, 'assignedTo');
          } else if (typeof value !== 'object') {
            conversationRecord.setValue(value, key);
          }
        }
      });

      const edge = ConnectionHandler.createEdge(
        store,
        connection,
        conversationRecord,
        'ConversationEdge',
      );

      ConnectionHandler.insertEdgeBefore(connection, edge);
    }
  });
};

const removeConversationFromConnection = (
  conversationId: string,
  filters: ConversationConnectionFilters,
): string | null => {
  let nextConversationId: string | null = null;

  updateConversationConnection(filters, ({ store, connection }) => {
    ConnectionHandler.deleteNode(connection, conversationId);
    store.delete(conversationId);

    const edges = connection.getLinkedRecords('edges') || [];
    const nextEdge = edges.find((edge) => {
      const node = edge?.getLinkedRecord('node');
      return node?.getDataID() !== conversationId;
    });

    nextConversationId =
      (nextEdge?.getLinkedRecord('node')?.getDataID() as
        | string
        | undefined
        | null) ?? null;
  });

  return nextConversationId;
};

export const RelayStoreHelper = {
  addOrMoveConversationToTop,
  removeConversationFromConnection,
  updateConversationConnection,
};
