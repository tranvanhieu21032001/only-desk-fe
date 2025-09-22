import { graphql } from 'relay-runtime';

export const conversationListQuery = graphql`
  query ConversationListQuery(
    $first: Float
    $after: String
    $assignedToMe: Boolean
    $keyword: String
    $filter: ConversationFilter
  ) {
    ...ConversationFragment_query
      @arguments(
        assignedToMe: $assignedToMe
        first: $first
        after: $after
        keyword: $keyword
        filter: $filter
      )
  }
`;
