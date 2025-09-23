import { graphql } from 'react-relay';

export const articlesQuery = graphql`
query ArticlesQuery($keyword: String){
  helpdeskArticles(keyword: $keyword){
    edges{
      node{
		    id
        title
        content
        url
        createdAt
        updatedAt
      }
    }
  }
}
`