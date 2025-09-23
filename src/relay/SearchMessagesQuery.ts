import { graphql } from 'react-relay';

export const searchMessageQuery = graphql`
  query SearchMessagesQuery($keyword: String!, $first: Float, $after: String) {
    searchMessages(keyword: $keyword, first: $first, after: $after) {
      edges {
        node {
          id
          content
          user {
            id
            firstName
            lastName
            avatar
          }
          conversation {
            id
          }
          sender
          createdAt
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;