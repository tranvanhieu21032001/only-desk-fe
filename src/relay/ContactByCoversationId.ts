import { graphql } from 'react-relay';

export const contactByCoversationIdQuery = graphql`
  query ContactByCoversationIdQuery($id: ID!) {
    node(id: $id) {
      ... on Conversation {
        id
        contact {
          id
          rawId
          avatar
          name
          email
         context{
            city
            countryName
            language
            os
            browser
						countryCode
          }
        }
      }
    }
  }
`;
