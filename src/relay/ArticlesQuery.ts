import { graphql } from 'react-relay';

export const articlesQuery = graphql`
  query ArticlesQuery(
    $first: Float
    $after: String
    $keyword: String
  ) {
    helpdeskArticles(first: $first, after: $after, keyword: $keyword) {
      edges {
        node {
          id
          title
          content
          url
          createdAt
          updatedAt
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;