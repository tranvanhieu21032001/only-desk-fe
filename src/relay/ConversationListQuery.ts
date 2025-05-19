import { graphql } from 'react-relay';

export const conversationListQuery = graphql`
  query ConversationListQuery($workspaceId: ID!, $args: ConnectionArgs!) {
    conversations(workspaceId: $workspaceId, args: $args) {
      edges {
        cursor
        node {
          id
          guestName
          guestIdentifier
          status
          subject
          metadata
          createdAt
          updatedAt
          lastActivityAt
          closedAt
          unreadGuestCount
          unreadAgentCount
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
