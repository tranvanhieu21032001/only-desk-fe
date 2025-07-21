import { graphql } from 'react-relay';

export const conversationListQuery = graphql`
  query ConversationListQuery {
    conversations {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
      edges {
        cursor
        node {
          id
          rawId
          contact {
            id
            rawId
            email
            avatar
            name
            isOnline
          }
          subject
          metadata
          createdAt
          updatedAt
          lastActivityAt
          closedAt
          unreadCount
          assignedTo {
            id
          }
          latestMessage {
            content
          }
        }
      }
    }
  }
`;
