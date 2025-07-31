import { graphql } from "react-relay";

export const helpdeskPublicSettingsQuery = graphql`
  query HelpdeskPublicSettingsQuery {
    helpdeskPublicSettings {
      basicDomain
      customDomain
      logo
      banner
      name
      languages
    }
  }
`;
