import { graphql } from 'react-relay';

export const contactDetailsQuery = graphql`
  query ContactDetailsQuery($id: ID!) {
    node(id: $id) {
      ... on Contact {
        id
        rawId
        name
        email
        phoneNumber
        address
        gender
        website
        notification
        lastActivityAt
        avatar
        createdAt
        updatedAt
        isOnline
        segments
        lastConversations{
          id
          latestMessage{
						id
            content
            createdAt
            user{
              id
              email
              firstName
              lastName
              avatar
            }
          }
        }
        notes
        metadata 
        companyInfo {
          company
          jobTitle
          jobRole
          website
          city
          country
          employees
        }
        context {
          countryCode
          countryName
          city
          latitude
          longitude
          browser
          os
          timezone
          language
        }
      }
    }
  }
`;
