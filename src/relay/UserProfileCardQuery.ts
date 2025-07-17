import { graphql } from 'react-relay';
export const userProfileCardQuery = graphql`
  query UserProfileCardQuery($id: ID!) {
    node(id: $id) {
      ... on User {
        id
        firstName
        lastName
        email
        rawId
        lastActivityAt
        avatar
        isOnline
      }
    }
  }
`;
