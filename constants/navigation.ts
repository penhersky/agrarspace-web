import { encrypt } from "../utils/crypto";

export const OZ_ROUTES = {
  dashboard: "/organization/dashboard",
  organization: "/organization/self",

  plantations: "/organization/plantations",
  yields: "/organization/yields",
  globalMap: "/organization/global-map",

  employees: "/organization/employees",

  calendar: "/organization/calendar",
  weather: "/organization/weather",

  contactUs: "/organization/contactUs",
  help: "/organization/help",
};

export const AUTH = {
  userSingIn: "/auth/sign_in",
  userSingUp: "/auth/sign_up",
  organizationLogin: (id: string) => `/auth/organization/${encrypt(id)}`,
};
