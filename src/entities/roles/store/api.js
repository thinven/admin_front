import { get, post, patch, del } from "support/wrapper";

export const getRoles = role => get("/api/roles", role);

export const addRole = role => post("/api/roles", role);

export const patchRole = role => patch("/api/roles", role);

export const delRole = role => del("/api/roles", role);
