import { graphql } from 'react-relay';

export const searchMessageQuery = graphql`
query SearchMessagesQuery($keyword: String!, $first: Float) {
  searchMessages(keyword: $keyword, first: $first) {
    edges{
	    node{
            id
            content
            user{
                id
                firstName
                lastName
                avatar
            }
            conversation{
                id
            }
            sender
            createdAt
        }
    }
  }
}
`