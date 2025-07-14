import { graphql } from 'relay-runtime';

export const messageListFragment = graphql`
  fragment MessageFragment_query on Query
  @argumentDefinitions(
    conversationId: { type: "ID!" }
    first: { type: "Float", defaultValue: 20 }
    after: { type: "String" }
  )
  @refetchable(queryName: "MessageFragmentPaginationQuery") {
    messages(
      conversationId: $conversationId,
      first: $first,
      after: $after
    ) @connection(key: "MessageFragment_messages", filters: ["conversationId"]) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          id
          content
          sender
          createdAt
          updatedAt
          metadata
          type
          status
          user {
            id
            firstName
            lastName
            avatar
          }
        }
      }
    }
  }
`;
