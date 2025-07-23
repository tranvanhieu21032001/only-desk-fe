import { graphql } from 'react-relay';

export const operatorsQuery = graphql`
  query OperatorsQuery {
    operators {
      id
      rawId
      user {
        avatar
        firstName
        lastName
        email
        rawId
      }
      role
      status
    }
  }
`;
