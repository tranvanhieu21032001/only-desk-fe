import { graphql } from 'react-relay';

export const conversationListFragment = graphql`
  fragment ConversationListFragment_query on Query
  @refetchable(queryName: "ConversationListPaginationQuery")
  @argumentDefinitions(
    first: { type: "Float", defaultValue: 10 }
    after: { type: "String" }
  ) {
    conversations(first: $first, after: $after)
      @connection(key: "ConversationListFragment_conversations") {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        cursor
        node {
          id
          contact {
            avatar
            name
            isOnline
            id
            name
            email
            context {
              countryCode
            }
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
