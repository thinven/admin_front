import { createAction, handleActions } from "redux-actions";

import { pender } from "redux-pender";

import * as api from "./api";
import defaults from "./defaults";

import { Immer as im } from "support/utils";

// action types
const GET_DEPLOYMENT = "deployment/GET_FILEMANAGER";
const UPLOAD_DEPLOYMENT = "deployment/UPLOAD_DEPLOYMENT";
const CHANGE_INPUT = "deployment/CHANGE_INPUT";
const NEWFOLDER_DEPLOYMENT = "deployment/NEWFOLDER_DEPLOYMENT";
//=============================================================================

// action creators
export const getDeployment = createAction(GET_DEPLOYMENT, api.getDeployment);
export const uploadDeployment = createAction(
  UPLOAD_DEPLOYMENT,
  api.uploadDeployment
);
export const changeInput = createAction(CHANGE_INPUT);
export const newFolderDeployment = createAction(
  NEWFOLDER_DEPLOYMENT,
  api.newFolderDeployment
);
//=============================================================================

// reducer define
const reduceInfo = (draft, action) => {
  const { fileList } = action.payload.data;
  Object.assign(draft, {
    fileList: fileList,
    loading: false
  });
};
const reduceUpload = () => {};
const reduceAdd = () => {};
//=============================================================================

// reducer
export default handleActions(
  {
    ...pender(im(GET_DEPLOYMENT, reduceInfo)),
    ...pender(im(UPLOAD_DEPLOYMENT, reduceUpload)),
    [CHANGE_INPUT]: im((draft, action) => {
      const { name, value } = action.payload;
      draft.form[name] = value;
    }),
    ...pender(im(NEWFOLDER_DEPLOYMENT, reduceAdd))
  },
  defaults
);
