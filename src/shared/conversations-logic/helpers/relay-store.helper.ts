import { commitLocalUpdate } from 'react-relay';
import { ConnectionHandler, RecordSourceSelectorProxy } from 'relay-runtime';
import environment from '@/relay/RelayEnvironment';
import { Message } from '@/shared/chat-logic';

const createMessageRecord = (
  store: RecordSourceSelectorProxy,
  msg: Message,
) => {
  const messageRecord = store.create(msg.id, 'Message');
  messageRecord.setValue(msg.id, 'id');
  messageRecord.setValue(msg.content, 'content');
  messageRecord.setValue(msg.sender, 'sender');
  messageRecord.setValue(msg.createdAt, 'createdAt');
  messageRecord.setValue(msg.updatedAt, 'updatedAt');
  messageRecord.setValue(msg.type, 'type');
  messageRecord.setValue(msg.status, 'status');
  if (msg.metadata) {
    const metadataString = JSON.stringify(msg.metadata);
    messageRecord.setValue(metadataString, 'metadata');
  }
  if (msg.user) {
    const userRecord = store.create(`${msg.id}_user_${msg.user.id}`, 'User');
    userRecord.setValue(msg.user.id, 'id');
    userRecord.setValue(msg.user.firstName, 'firstName');
    userRecord.setValue(msg.user.lastName, 'lastName');
    userRecord.setValue(msg.user.avatar, 'avatar');
    messageRecord.setLinkedRecord(userRecord, 'user');
  }
  return messageRecord;
};

const addMessage = (msg: Message, conversationId: string, isEnd?: boolean) => {
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

    // StrictMode: Avoid duplicate messages
    // Check if message ID already exists
    const edges = connection.getLinkedRecords('edges');
    const messageId = msg.id;

    const alreadyExists = edges?.some((edge) => {
      const node = edge.getLinkedRecord('node');
      return node?.getDataID() === messageId;
    });

    if (alreadyExists) {
      return; // Skip inserting duplicate message
    }

    const messageRecord = createMessageRecord(store, msg);
    const edge = ConnectionHandler.createEdge(
      store,
      connection,
      messageRecord,
      'MessageTypeEdge',
    );

    if (isEnd) {
      ConnectionHandler.insertEdgeAfter(connection, edge);
    } else {
      ConnectionHandler.insertEdgeBefore(connection, edge);
    }
  });
};

const updateMessage = (messageId: string, updates: Partial<Message>) => {
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
        messageRecord.setValue(JSON.stringify(updates.metadata), 'metadata');
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
};

const removeMessage = (messageId: string, rawConversationId: string) => {
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
};

export const RelayStoreHelper = {
  addMessage,
  updateMessage,
  removeMessage,
};
