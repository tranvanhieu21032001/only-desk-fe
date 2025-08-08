import { graphql } from 'react-relay';

export const installedPluginQuery = graphql`
  query InstalledPluginQuery {
    installedPlugins {
      id
      key
      name
      isInstalled
      shortDesc
      version
      category
      type
      iconUrl
      docUrl
    }
  }
`;
