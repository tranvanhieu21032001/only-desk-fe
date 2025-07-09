import { graphql } from 'react-relay';

export const conversationListQuery = graphql`
  query ConversationListQuery($args: ConnectionArgs!) {
    conversations(args: $args) {
      edges {
        cursor
        node {
          id
          contact {
            avatar
            name
            isOnline
          }
          status
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
