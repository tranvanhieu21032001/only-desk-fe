import { graphql } from 'react-relay';

export const contactDetailsQuery = graphql`
  query ContactDetailsQuery($id: ID!) {
    node(id: $id) {
      ... on Contact {
        id
        rawId
        name
        email
        phoneNumber
        address
        gender
        website
        notification
        avatar
        createdAt
        updatedAt
        isOnline
        segments
        companyInfo {
          company
          jobTitle
        }
      }
    }
  }
`;
