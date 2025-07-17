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
          contact {
            avatar
            name
            email
            isOnline
            rawId
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
