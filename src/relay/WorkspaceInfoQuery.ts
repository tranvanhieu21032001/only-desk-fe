import { graphql } from 'react-relay';

export const workspaceInfoQuery = graphql`
  query WorkspaceInfoQuery {
    workspaces {
      id
      rawId
      name
      websiteID
      websiteUrl
      logo
      contactEmail
      contactPhone
      metadata
    }
  }
`;
