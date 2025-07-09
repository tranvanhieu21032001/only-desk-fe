import { graphql } from 'relay-runtime';

export const messageQuery = graphql`
  query MessageQuery(
    $conversationId: ID!
    $first: Float
    $after: String
    $last: Float
    $before: String
  ) {
    messages(
      conversationId: $conversationId
      first: $first
      after: $after
      last: $last
      before: $before
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          content
          sender
          createdAt
          metadata
          user {
            firstName
            lastName
            avatar
          }
          type
          status
        }
      }
    }
  }
`;
