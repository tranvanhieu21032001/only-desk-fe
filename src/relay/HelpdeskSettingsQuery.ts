import { graphql } from 'react-relay';

export const helpdeskSettingsQuery = graphql`
  query HelpdeskSettingsQuery {
    helpdeskSettings {
      baseDomain
      customDomain
      logo
      banner
      languages
    }
  }
`;
