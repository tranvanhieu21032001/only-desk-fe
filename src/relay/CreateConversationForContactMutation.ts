import { graphql } from 'react-relay';

export const createConversationForContactMutation = graphql`
mutation CreateConversationForContactMutation($contactId: ID!) {
  createConversationForContact(contactId: $contactId) {
    id
    subject
    segments
    createdAt
    contact {
      id
      name
      email
      phoneNumber
      address
      gender
    }
  }
}

`