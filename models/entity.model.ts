import { EmployeeRoles, UserRoles } from "./enums.model";

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  role: UserRoles;
  email: string;
  phoneNumber: string;
  provider: string;
  createdAt: String;
  updatedAt: String;
}

export interface IEmployee {
  id: number;
  name: string;
  position: string;
  role: EmployeeRoles;
  organizationId: number;
  createdAt: String;
  updatedAt: String;
}

export interface IOrganization<T = IUser> {
  id: number;
  name: String;
  owner: T;
  description: String;
  confirmed: boolean;
  createdAt: String;
  updatedAt: String;
}
