import { get, post, patch, del } from "support/wrapper";

export const getCommonCodes = commonCode => get("/commonCodes", commonCode);

export const getCommonCode = commonCode => get("/commonCodes", commonCode);

export const addCommonCode = commonCode => post("/commonCodes", commonCode);

export const patchCommonCode = commonCode => patch("/commonCodes", commonCode);

export const delCommonCode = commonCode => del("/commonCodes", commonCode);
