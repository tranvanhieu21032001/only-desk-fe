import { graphql } from 'relay-runtime';

export const conversationMessagesQuery = graphql`
  query ConversationMessagesQuery(
    $conversationId: ID!
    $first: Float
    $after: String
  ) {
    ...MessageFragment_query
      @arguments(conversationId: $conversationId, first: $first, after: $after)
  }
`;
