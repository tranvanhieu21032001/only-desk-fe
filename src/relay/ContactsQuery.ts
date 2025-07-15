import { graphql } from 'react-relay';

export const contactsQuery = graphql`
  query ContactsQuery($args: PaginationArgs!, $keyword: String) {
    contacts(args: $args, keyword: $keyword) {
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
            countryCode
            countryName
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
