import { graphql } from 'react-relay';

export const workspaceQuery = graphql`
  query WorkspaceQuery {
    workspaces {
      id
      name
      websiteID
      websiteUrl
      logo
    }
  }
`;
