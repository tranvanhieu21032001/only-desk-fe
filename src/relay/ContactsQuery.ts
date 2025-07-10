import { graphql } from 'react-relay';

export const contactsQuery = graphql`
  query ContactsQuery($args: PaginationArgs!) {
    contacts(args: $args) {
      edges {
        node {
          id
          name
          email
          address
          rawId
          segments
          lastActivityAt
          avatar
          companyInfo {
            company
          }
          context {
            country
            city
            timezone
            language
          }
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
