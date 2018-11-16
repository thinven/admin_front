import { get, post, patch, del } from "support/wrapper";

export const getCommonCodeGroups = commonCodeGroup =>
  get("/api/commonCodeGroups", commonCodeGroup);

export const addCommonCodeGroup = commonCodeGroup =>
  post("/api/commonCodeGroups", commonCodeGroup);

export const patchCommonCodeGroup = commonCodeGroup =>
  patch("/api/commonCodeGroups", commonCodeGroup);

export const delCommonCodeGroup = commonCodeGroup =>
  del("/api/commonCodeGroups", commonCodeGroup);
