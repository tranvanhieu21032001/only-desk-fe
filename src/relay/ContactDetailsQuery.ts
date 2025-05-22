import { graphql } from 'react-relay';

export const contactDetailsQuery = graphql`
  query ContactDetailsQuery($id: String!) {
    contact(id: $id) {
      id
      name
      email
      phoneNumber
      address
      notification
      companyInfo
      segments
      metadata
      trackingInfo
      notes
      isOnline
      lastActivityAt
      createdAt
      updatedAt
    }
  }
`;
