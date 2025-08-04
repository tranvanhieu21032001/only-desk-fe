import { graphql } from 'relay-runtime';

export const conversationListFragment = graphql`
  fragment ConversationFragment_query on Query
  @argumentDefinitions(
    assignedToMe: { type: "Boolean", defaultValue: false }
    first: { type: "Float", defaultValue: 10 }
    after: { type: "String" }
  )
  @refetchable(queryName: "ConversationFragmentPaginationQuery") {
    conversations(assignedToMe: $assignedToMe, first: $first, after: $after)
      @connection(
        key: "ConversationFragment_conversations"
        filters: ["assignedToMe"]
      ) {
      pageInfo {
        hasNextPage
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
          }
        }
      }
    }
  }
`;
