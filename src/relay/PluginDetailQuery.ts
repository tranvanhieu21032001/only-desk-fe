import { graphql } from 'react-relay';
export const pluginDetailQuery = graphql`
  query PluginDetailQuery($id: ID!) {
    node(id: $id) {
      ... on Plugin {
        id
        rawId
        key
        name
        type
        desc
        version
        category
        iconUrl
        isInstalled
        author {
          name
          photo
          domain
        }
        __typename
      }
    }
  }
`;
