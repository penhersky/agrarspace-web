import { gql } from "@apollo/client";

// eslint-disable-next-line import/prefer-default-export
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
