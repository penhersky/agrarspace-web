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
  name: string;
  logo?: string;
  owner: T;
  description?: string;
  confirmed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IPlantation {
  id: number;
  name: string;
  status: string;
  areaSize: number;
  region: string;
  description: string;
  organization: IOrganization;
  // years: [Year]
  // currentYear: Year
  createdAt: string;
  updatedAt: string;
  // # areaPoints: [PlantationAreaPoint]
}

export interface ILocation {
  lng: number;
  lat: number;
}

export interface IRootData<T> {
  data: T;
}
