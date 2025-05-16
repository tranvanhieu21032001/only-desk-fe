import { graphql } from 'react-relay';

export const meQuery = graphql`
  query MeQuery {
    me {
      id
      firstName
      lastName
      email
      avatar
    }
  }
`;
