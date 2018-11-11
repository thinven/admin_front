import { createAction, handleActions } from "redux-actions";

import { pender } from "redux-pender";

import * as api from "./api";
import defaults from "./defaults";

import { Security, Immer as im } from "support/utils";

// action types
const GET_DEPLOYMENT = "deployment/GET_FILEMANAGER";
const GET_DEPLOYMENT_TEXT = "deployment/GET_DEPLOYMENT_TEXT";
const UPLOAD_DEPLOYMENT = "deployment/UPLOAD_DEPLOYMENT";
const CHANGE_INPUT = "deployment/CHANGE_INPUT";
const NEWFOLDER_DEPLOYMENT = "deployment/NEWFOLDER_DEPLOYMENT";
const PATCH_DEPLOYMENT_TEXT = "deployment/PATCH_DEPLOYMENT_TEXT";
const DEL_DEPLOYMENT = "deployment/DEL_DEPLOYMENT";
//=============================================================================

// action creators
export const getDeployment = createAction(GET_DEPLOYMENT, api.getDeployment);
export const getDeploymentText = createAction(
  GET_DEPLOYMENT_TEXT,
  api.getDeploymentText
);
export const uploadDeployment = createAction(
  UPLOAD_DEPLOYMENT,
  api.uploadDeployment
);
export const changeInput = createAction(CHANGE_INPUT);
export const newFolderDeployment = createAction(
  NEWFOLDER_DEPLOYMENT,
  api.newFolderDeployment
);
export const patchDeploymentText = createAction(
  PATCH_DEPLOYMENT_TEXT,
  api.patchDeploymentText
);
export const delDeployment = createAction(DEL_DEPLOYMENT, api.delDeployment);
//=============================================================================

// reducer define
const reduceInfo = (draft, action) => {
  const { fileList } = action.payload.data;
  Object.assign(draft, {
    fileList: fileList,
    loading: false
  });
};
const reduceText = (draft, action) => {
  const { filetext } = action.payload.data;
  draft.form.text = filetext;
  draft.editor = Security.generateKey();
};
const reduceUpload = () => {};
const reduceAdd = () => {};
const reducePatchText = () => {};
const reduceDel = () => {};
//=============================================================================

// reducer
export default handleActions(
  {
    ...pender(im(GET_DEPLOYMENT, reduceInfo)),
    ...pender(im(GET_DEPLOYMENT_TEXT, reduceText)),
    ...pender(im(UPLOAD_DEPLOYMENT, reduceUpload)),
    [CHANGE_INPUT]: im((draft, action) => {
      const { name, value } = action.payload;
      draft.form[name] = value;
    }),
    ...pender(im(NEWFOLDER_DEPLOYMENT, reduceAdd)),
    ...pender(im(PATCH_DEPLOYMENT_TEXT, reducePatchText)),
    ...pender(im(DEL_DEPLOYMENT, reduceDel))
  },
  defaults
);
