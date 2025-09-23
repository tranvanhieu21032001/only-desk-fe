import { graphql } from 'react-relay';

export const allPluginsQuery = graphql`
  query AllpluginsQuery(
    $first: Float
    $after: String
    $last: Float
    $before: String
    $keyword: String
  ) {
    plugins(first: $first, after: $after, last: $last, before: $before, keyword: $keyword) {
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
