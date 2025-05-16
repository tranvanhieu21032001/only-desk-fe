import { graphql } from 'react-relay';

export const workspaceQuery = graphql`
  query workspaceQuery {
    workspaces {
      id
      name
      websiteID
      websiteUrl
      logo
      contactEmail
      contactPhone
      owner {
        firstName
        email
      }
      role
    }
  }
`;
