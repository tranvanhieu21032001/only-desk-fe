import { graphql } from 'react-relay';

export const helpdeskSettingsQuery = graphql`
  query HelpdeskSettingsQuery {
    helpdeskSettings {
    basicDomain
    customDomain
    logo
    banner
    name
    languages
    }
  }
`;
