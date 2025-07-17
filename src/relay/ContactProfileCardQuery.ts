import { graphql } from 'react-relay';
export const contactProfileCardQuery = graphql`
  query ContactProfileCardQuery($id: ID!) {
    node(id: $id) {
      ... on Contact {
        id
        name
        email
        rawId
        lastActivityAt
        avatar
        isOnline
        context {
          countryCode
          countryName
        }
      }
    }
  }
`;
