import { get, post, patch, del } from "support/wrapper";

export const addEmployee = employee => post("/employees", employee);

export const getEmployees = employee => get("/employees", employee);

export const getEmployee = employee => get("/employees", employee);

export const patchEmployee = employee => patch("/employees", employee);

export const delEmployee = employee => del("/employees", employee);
