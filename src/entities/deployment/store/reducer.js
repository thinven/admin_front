import { createAction, handleActions } from "redux-actions";

import { pender } from "redux-pender";

import * as api from "./api";
import defaults from "./defaults";

import { Immer as im } from "support/utils";

// action types
const GET_DEPLOYMENT = "deployment/GET_FILEMANAGER";
//=============================================================================

// action creators
export const getDeployment = createAction(GET_DEPLOYMENT, api.getDeployment);
//=============================================================================

// reducer define
const reduceInfo = (draft, action) => {
  const { fileList } = action.payload.data;
  Object.assign(draft, {
    fileList: fileList,
    loading: false
  });
};
//=============================================================================

// reducer
export default handleActions(
  {
    ...pender(im(GET_DEPLOYMENT, reduceInfo))
  },
  defaults
);
