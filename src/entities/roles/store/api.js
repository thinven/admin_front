import { get, post, patch, del } from "support/wrapper";

export const getRoles = role => get("/roles", role);

export const addRole = role => post("/roles", role);

export const patchRole = role => patch("/roles", role);

export const delRole = role => del("/roles", role);
