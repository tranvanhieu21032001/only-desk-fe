import { graphql } from 'relay-runtime';

export const conversationListQuery = graphql`
  query ConversationListQuery(
    $first: Float
    $after: String
    $assignedToMe: Boolean
  ) {
    ...ConversationFragment_query
      @arguments(assignedToMe: $assignedToMe, first: $first, after: $after)
  }
`;
