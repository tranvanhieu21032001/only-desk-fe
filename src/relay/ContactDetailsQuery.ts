import { graphql } from 'react-relay';

export const contactDetailsQuery = graphql`
  query ContactDetailsQuery($id: ID!) {
    node(id: $id) {
      ... on Contact {
        id
        name
        email
        phoneNumber
        address
        companyInfo {
          company
          jobTitle
        }
        segments
        lastActivityAt
      }
    }
  }
`;
