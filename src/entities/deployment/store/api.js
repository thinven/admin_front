import { get, post, patch, del } from "support/wrapper";

export const getDeployment = deployment => get("/deployment", deployment);

export const addDeployment = deployment => post("/deployment", deployment);

export const patchDeployment = deployment => patch("/deployment", deployment);

export const delDeployment = deployment => del("/deployment", deployment);
