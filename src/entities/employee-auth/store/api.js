import { get } from "support/wrapper";

export const getEmployeeAuth = employeeAuth =>
  get("/employeeAuth", employeeAuth);
