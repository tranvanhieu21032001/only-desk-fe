import { graphql } from 'relay-runtime';

export const messageQuery = graphql`
  query MessageQuery($conversationId: ID!, $first: Float, $after: String, $last: Float, $before: String) {
    messages(
      conversationId: $conversationId,
      first: $first,
      after: $after,
      last: $last,
      before: $before
    ) {
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
