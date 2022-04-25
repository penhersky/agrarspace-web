import { gql } from "@apollo/client";

export const SING_IN_TO_ORGANIZATION = gql`
  query SignInToOrganization(
    $data: SignInOrganization!
    $info: UserDeviceInfo!
  ) {
    signInToOrganization(data: $data, info: $info) {
      token
      expiresIn
    }
  }
`;

export const AUTHENTICATION = gql`
  query Authenticate {
    authenticate {
      token
      expiresIn
      type
      user {
        id
        role
        email
        firstName
        lastName
        phoneNumber
        provider
        createdAt
      }
      employee {
        id
        name
        role
        position
        organization {
          id
        }
        createdAt
      }
    }
  }
`;
