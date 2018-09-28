import { get, post, patch, del } from "support/wrapper";

export const getCommonCodeGroups = commonCodeGroup =>
  get("/commonCodeGroups", commonCodeGroup);

export const addCommonCodeGroup = commonCodeGroup =>
  post("/commonCodeGroups", commonCodeGroup);

export const patchCommonCodeGroup = commonCodeGroup =>
  patch("/commonCodeGroups", commonCodeGroup);

export const delCommonCodeGroup = commonCodeGroup =>
  del("/commonCodeGroups", commonCodeGroup);
