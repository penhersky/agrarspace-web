import { gql } from "@apollo/client";

// eslint-disable-next-line import/prefer-default-export
export const GET_MY_ORGANIZATION = gql`
  query GetMyOrganization {
    getMyOrganization {
      id
      name
      description
      owner {
        id
        firstName
        lastName
      }
      createdAt
    }
  }
`;
