import { IEmployee, IUser } from "./entity.model";
import { UserTypes } from "./enums.model";

export interface UserDeviceInfo {
  os: string;
  browser: string;
  details: string;
}

interface ISingIn {
  token: string;
  expiresIn: string;
  type: UserTypes;
}

interface ISignInOrganizationData {
  organizationId: number;
  name: string;
  password: string;
}

export interface IAuthenticationResult {
  authenticate: {
    token: string;
    expiresIn: string;
    user: IUser;
    type: UserTypes;
    employee: IEmployee;
  };
}

export interface ISignInResultResult {
  signInToOrganization: ISingIn;
}

export interface ISingInOrganizationVariables {
  data: ISignInOrganizationData;
  info: UserDeviceInfo;
}
