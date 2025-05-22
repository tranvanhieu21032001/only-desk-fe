import { graphql } from 'react-relay';

export const contactsQuery = graphql`
  query ContactsQuery($workspaceId: ID!, $args: PaginationArgs!) {
    contacts(workspaceId: $workspaceId, args: $args) {
      edges {
        node {
          name
          id
          email
          address
          segments
          lastActivityAt
          companyInfo
        }
      }
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;
