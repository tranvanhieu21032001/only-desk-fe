import { graphql } from 'react-relay';

export const categoriesQuery = graphql`
  query CategoriesQuery {
    helpdeskCategories {
      id
      name
      image
      desc
      createdAt
      updatedAt
      articles {
        id
        rawId
        title
        content
        createdAt
        updatedAt
      }
      sections {
        id
        name
        createdAt
        updatedAt
        articles {
          id
          rawId
          title
          content
          createdAt
          updatedAt
        }
      }
    }
  }
`;
