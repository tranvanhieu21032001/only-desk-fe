import { graphql } from 'react-relay';

export const coversationDetailsForListQuery = graphql`
  query CoversationDetailsForListQuery($id: ID!) {
    node(id: $id) {
      ... on Conversation {
        id
        rawId
        contact {
          id
          rawId
          avatar
          name
          isOnline
          email
          context {
            countryCode
          }
        }
        subject
        resolved
        metadata
        lastActivityAt
        unreadCount
        assignedTo {
          id
        }
        latestMessage {
          content
          type
        }
      }
    }
  }
`;
