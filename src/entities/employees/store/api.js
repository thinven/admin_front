import { get, post, patch, del } from "support/wrapper";

export const addEmployee = employee => post("/api/employees", employee);

export const getEmployees = employee => get("/api/employees", employee);

export const getEmployee = employee => get("/api/employees", employee);

export const patchEmployee = employee => patch("/api/employees", employee);

export const delEmployee = employee => del("/api/employees", employee);
