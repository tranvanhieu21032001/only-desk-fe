import { graphql } from 'react-relay';

export const allPluginsQuery = graphql`
  query AllpluginsQuery(
    $first: Float
    $after: String
    $last: Float
    $before: String
  ) {
    plugins(first: $first, after: $after, last: $last, before: $before) {
      edges {
        node {
          id
          key
          name
          isInstalled
          shortDesc
          version
          category
          type
          iconUrl
          docUrl
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;
