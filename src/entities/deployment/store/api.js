import { get, post, patch, del } from "support/wrapper";
import { upload } from "../../../support/wrapper";

export const getDeployment = deployment => get("/deployment", deployment);

export const addDeployment = deployment => post("/deployment", deployment);

export const patchDeployment = deployment => patch("/deployment", deployment);

export const delDeployment = deployment => del("/deployment", deployment);

export const uploadDeployment = (deployment, files) =>
  upload("/deployment/upload", deployment, files);
