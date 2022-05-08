import { IEmployee, IUser } from "./entity.model";
import { UserTypes } from "./enums.model";

export interface UserDeviceInfo {
  os: string;
  browser: string;
  details: string;
}

interface ISingIn {
  token: string;
  rToken: string;
  type: UserTypes;
}

interface ISignInOrganizationData {
  organizationId: number;
  name: string;
  password: string;
}

interface IOrganizationEmployee extends IEmployee {
  organization: {
    id: number;
  };
}
export interface IAuthenticationResult {
  authenticate: {
    user: IUser;
    type: UserTypes;
    employee: IOrganizationEmployee;
  };
}

export interface ISignInResultResult {
  signInToOrganization: ISingIn;
}

export interface ISingInOrganizationVariables {
  data: ISignInOrganizationData;
  info: UserDeviceInfo;
}
