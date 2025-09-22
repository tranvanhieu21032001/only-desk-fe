import { graphql } from 'relay-runtime';

export const conversationListFragment = graphql`
  fragment ConversationFragment_query on Query
  @argumentDefinitions(
    assignedToMe: { type: "Boolean", defaultValue: false }
    first: { type: "Float", defaultValue: 10 }
    after: { type: "String" }
    keyword: { type: "String" }
    filter: { type: "ConversationFilter", defaultValue: ALL }
  )
  @refetchable(queryName: "ConversationFragmentPaginationQuery") {
    conversations(
      assignedToMe: $assignedToMe
      first: $first
      after: $after
      keyword: $keyword
      filter: $filter
    )
      @connection(
        key: "ConversationFragment_conversations"
        filters: ["assignedToMe", "keyword", "filter"]
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
          subject
          resolved
          metadata
          lastActivityAt
          unreadCount
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
  }
`;
