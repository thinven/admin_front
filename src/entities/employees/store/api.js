import { get, post, put, del } from "support/wrapper";

export const addEmployee = employee => post("/employees", employee);

export const getEmployees = employee => get("/employees", employee);

export const getEmployee = employee => get("/employees", employee);

export const putEmployee = employee => put("/employees", employee);

export const delEmployee = employee => del("/employees", employee);
