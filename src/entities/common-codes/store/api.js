import { get, post, patch, del } from "support/wrapper";

export const getCommonCodes = commonCode => get("/api/commonCodes", commonCode);

export const getCommonCode = commonCode => get("/api/commonCodes", commonCode);

export const addCommonCode = commonCode => post("/api/commonCodes", commonCode);

export const patchCommonCode = commonCode =>
  patch("/api/commonCodes", commonCode);

export const delCommonCode = commonCode => del("/api/commonCodes", commonCode);
