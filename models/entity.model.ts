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
  createdAt: String;
  updatedAt: String;
}
