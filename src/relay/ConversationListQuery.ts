import { graphql } from 'react-relay';

export const conversationListQuery = graphql`
 query ConversationListQuery($first: Float, $after: String) {
  conversations(first: $first, after: $after) {
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
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}

`;
