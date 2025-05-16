import { graphql } from 'react-relay';

export const workspaceInfoQuery = graphql`
  query WorkspaceInfoQuery {
    workspaces {
      id
      name
      websiteID
      websiteUrl
      logo
    }
  }
`;
