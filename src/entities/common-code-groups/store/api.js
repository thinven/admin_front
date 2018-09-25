import { get } from "support/wrapper";

export const getCommonCodeGroups = commonCodeGroup =>
  get("/commonCodeGroups", commonCodeGroup);
