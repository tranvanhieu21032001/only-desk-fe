import { graphql } from 'react-relay';

export const coversationDetailsQuery = graphql`
  query CoversationDetailsQuery($id: ID!) {
    node(id: $id) {
      ... on Conversation {
        id
        rawId
        contact {
          id
          rawId
          email
          avatar
          name
          isOnline
          guestId
          notification
          context {
            countryCode
            countryName
            city
            timezone
            language
            latitude
            longitude
            browser
            os
          }
        }
        participants {
          id
          email
          firstName
          lastName
          avatar
          isOnline
        }
        subject
        metadata
        resolved
        segments
        createdAt
        updatedAt
        lastActivityAt
        closedAt
        unreadCount
        assignedTo {
          id
        }
      }
    }
  }
`;
