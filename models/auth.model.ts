export interface UserDeviceInfo {
  os: string;
  browser: string;
  details: string;
}

interface ISignInOrganizationData {
  organizationId: number;
  name: string;
  password: string;
}

export interface ISignInResultResult {
  signInToOrganization: {
    token: string;
    expiresIn: string;
  };
}

export interface ISingInOrganizationVariables {
  data: ISignInOrganizationData;
  info: UserDeviceInfo;
}
