import { createAction, handleActions } from "redux-actions";

import { pender } from "redux-pender";

import * as api from "./api";
import defaults from "./defaults";

import { Immer as im } from "support/utils";

// action types
const GET_COMMONCODEGROUPS = "commonCodeGroups/GET_COMMONCODEGROUPS";
//-----------------------------------------------------------------------------
const INIT_FORM = "commonCodeGroups/INIT_FORM";
const LOAD_FORM = "commonCodeGroups/LOAD_FORM";
const CHANGE_INPUT = "commonCodeGroups/CHANGE_INPUT";
const ADD_COMMONCODEGROUP = "commonCodeGroups/ADD_COMMONCODEGROUP";
const PATCH_COMMONCODEGROUP = "commonCodeGroups/PATCH_COMMONCODEGROUP";
const DEL_COMMONCODEGROUP = "commonCodeGroups/DEL_COMMONCODEGROUP";
//=============================================================================

// action creators
export const getCommonCodeGroups = createAction(
  GET_COMMONCODEGROUPS,
  api.getCommonCodeGroups
);
//-----------------------------------------------------------------------------
export const initForm = createAction(INIT_FORM);
export const loadForm = createAction(LOAD_FORM);
export const changeInput = createAction(CHANGE_INPUT);
export const addCommonCodeGroup = createAction(
  ADD_COMMONCODEGROUP,
  api.addCommonCodeGroup
);
export const patchCommonCodeGroup = createAction(
  PATCH_COMMONCODEGROUP,
  api.patchCommonCodeGroup
);
export const delCommonCodeGroup = createAction(
  DEL_COMMONCODEGROUP,
  api.delCommonCodeGroup
);
//=============================================================================

const reduceList = (draft, action) => {
  const { commonCodeGroupList, commonCodeGroupPages } = action.payload.data;
  Object.assign(draft, {
    list: commonCodeGroupList,
    pages: commonCodeGroupPages,
    loading: false
  });
};
//-----------------------------------------------------------------------------
const reduceAdd = (draft, action) => {
  const { commonCodeGroup } = action.payload.data;
  draft.form.uid = commonCodeGroup.uid;
  draft.info = commonCodeGroup;
};
const reducePatch = (draft, action) => {
  const { commonCodeGroup } = action.payload.data;
  draft.form.uid = commonCodeGroup.uid;
  draft.info = commonCodeGroup;
};
const reduceDel = (draft, action) => {
  const { commonCodeGroup } = action.payload.data;
  draft.form.uid = commonCodeGroup.uid;
  draft.info = commonCodeGroup;
};
//=============================================================================

// reducer
export default handleActions(
  {
    ...pender(im(GET_COMMONCODEGROUPS, reduceList)),
    //-------------------------------------------------------------------------
    [INIT_FORM]: im(draft => {
      draft.form = defaults.form;
    }),
    [LOAD_FORM]: im((draft, action) => {
      draft.form = action.payload.info;
    }),
    [CHANGE_INPUT]: im((draft, action) => {
      draft.form[action.payload.name] = action.payload.value;
    }),
    ...pender(im(ADD_COMMONCODEGROUP, reduceAdd)),
    ...pender(im(PATCH_COMMONCODEGROUP, reducePatch)),
    ...pender(im(DEL_COMMONCODEGROUP, reduceDel))
  },
  defaults
);
