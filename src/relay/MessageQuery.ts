import { graphql } from 'relay-runtime';

export const messageQuery = graphql`
  query MessageQuery($conversationId: ID!, $args: ConnectionArgs!) {
    messages(conversationId: $conversationId, args: $args) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          content
          sender
          createdAt
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
