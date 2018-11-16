import { get } from "support/wrapper";

export const getEmployeeAuth = employeeAuth =>
  get("/api/employeeAuth", employeeAuth);
