import { createAction, handleActions } from "redux-actions";

import { Map, fromJS } from "immutable";
import { pender } from "redux-pender";

import * as api from "./api";
import defaults from "./defaults";

import { ApiSuccess } from "support/utils";

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

const reduceList = (state, action) => {
  const { commonCodeGroupList, commonCodeGroupPages } = action.payload.data;
  return state
    .set("list", fromJS(commonCodeGroupList))
    .set("pages", commonCodeGroupPages)
    .set("loading", false);
};
//-----------------------------------------------------------------------------
const reduceAdd = (state, action) => {
  const { commonCodeGroup } = action.payload.data;
  return state
    .setIn(["form", "uid"], commonCodeGroup.uid)
    .set("info", fromJS(commonCodeGroup));
};
const reducePatch = (state, action) => {
  const { commonCodeGroup } = action.payload.data;
  return state
    .setIn(["form", "uid"], commonCodeGroup.uid)
    .set("info", fromJS(commonCodeGroup));
};
const reduceDel = (state, action) => {
  const { commonCodeGroup } = action.payload.data;
  return state
    .setIn(["form", "uid"], commonCodeGroup.uid)
    .set("info", fromJS(commonCodeGroup));
};
//=============================================================================

// reducer
export default handleActions(
  {
    ...pender({
      type: GET_COMMONCODEGROUPS,
      onSuccess: (state, action) => ApiSuccess(state, action, reduceList)
    }),
    //-------------------------------------------------------------------------
    [INIT_FORM]: state => state.set("form", defaults.get("form")),
    [LOAD_FORM]: (state, action) => state.set("form", Map(action.payload.info)),
    [CHANGE_INPUT]: (state, action) =>
      state.setIn(["form", action.payload.name], action.payload.value),
    ...pender({
      type: ADD_COMMONCODEGROUP,
      onSuccess: (state, action) => ApiSuccess(state, action, reduceAdd)
    }),
    ...pender({
      type: PATCH_COMMONCODEGROUP,
      onSuccess: (state, action) => ApiSuccess(state, action, reducePatch)
    }),
    ...pender({
      type: DEL_COMMONCODEGROUP,
      onSuccess: (state, action) => ApiSuccess(state, action, reduceDel)
    })
  },
  defaults
);
