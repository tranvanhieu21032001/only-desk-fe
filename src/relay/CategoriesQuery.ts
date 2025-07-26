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
      sections {
        id
        name
        desc
        createdAt
        updatedAt
        articles {
          id
          title
          content
        }
      }
    }
  }
`;
