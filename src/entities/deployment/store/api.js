import { get, post, patch, del } from "support/wrapper";
import { upload } from "../../../support/wrapper";

export const getDeployment = deployment => get("/api/deployment", deployment);
export const getDeploymentText = deployment =>
  get("/api/deployment/text", deployment);

export const addDeployment = deployment => post("/api/deployment", deployment);
export const newFolderDeployment = deployment =>
  post("/api/deployment", deployment);

export const patchDeployment = deployment =>
  patch("/api/deployment", deployment);
export const uploadDeployment = (deployment, files) =>
  upload("/api/deployment/upload", deployment, files);
export const patchDeploymentText = deployment =>
  patch("/api/deployment/text", deployment);

export const delDeployment = deployment => del("/api/deployment", deployment);
