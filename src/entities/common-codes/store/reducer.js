import { createAction, handleActions } from "redux-actions";

import { Map, fromJS } from "immutable";
import { pender } from "redux-pender";

import * as api from "./api";
import defaults from "./defaults";

import { ApiSuccess } from "support/utils";

// action types
const LOAD_COMMONCODES = "commonCodes/LOAD_COMMONCODES";
const GET_COMMONCODES = "commonCodes/GET_COMMONCODES";
const GET_COMMONCODE = "commonCodes/GET_COMMONCODE";
//-----------------------------------------------------------------------------
const INIT_FORM = "commonCodes/INIT_FORM";
const LOAD_FORM = "commonCodes/LOAD_FORM";
const CHANGE_INPUT = "commonCodes/CHANGE_INPUT";
const ADD_COMMONCODE = "commonCodes/ADD_COMMONCODE";
const PATCH_COMMONCODE = "commonCodes/PATCH_COMMONCODE";
const DEL_COMMONCODE = "commonCodes/DEL_COMMONCODE";
//-----------------------------------------------------------------------------
const REFRESH_COMMONCODES = "commonCodes/REFRESH_COMMONCODES";
//=============================================================================

// action creators
export const loadCommonCodes = createAction(LOAD_COMMONCODES);
export const getCommonCodes = createAction(GET_COMMONCODES, api.getCommonCodes);
export const getCommonCode = createAction(GET_COMMONCODE, api.getCommonCode);
//-----------------------------------------------------------------------------
export const initForm = createAction(INIT_FORM);
export const loadForm = createAction(LOAD_FORM);
export const changeInput = createAction(CHANGE_INPUT);
export const addCommonCode = createAction(ADD_COMMONCODE, api.addCommonCode);
export const patchCommonCode = createAction(
  PATCH_COMMONCODE,
  api.patchCommonCode
);
export const delCommonCode = createAction(DEL_COMMONCODE, api.delCommonCode);
//-----------------------------------------------------------------------------
export const refreshCommonCodes = createAction(REFRESH_COMMONCODES);
//=============================================================================

// reducer define
const reduceList = (state, action) => {
  const { commonCodeList, commonCodePages, useCodes } = action.payload.data;
  return state
    .set("list", fromJS(commonCodeList))
    .set("useCodes", fromJS(useCodes))
    .set("pages", commonCodePages)
    .set("loading", false);
};
const reduceInfo = (state, action) => {
  const { info } = action.payload.data;
  return state.set("info", fromJS(info));
};
//-----------------------------------------------------------------------------
const reduceAdd = (state, action) => {
  const { commonCode } = action.payload.data;
  return state
    .setIn(["form", "uid"], commonCode.uid)
    .set("info", fromJS(commonCode))
    .set("list", state.get("list").unshift(fromJS(commonCode)));
};
const reducePatch = (state, action) => {
  const { commonCode } = action.payload.data;
  let list = state.get("list");
  return state
    .setIn(["form", "uid"], commonCode.uid)
    .set("info", fromJS(commonCode))
    .set(
      "list",
      list.update(
        list.findIndex(function(item) {
          return item.get("uid") === commonCode.uid;
        }),
        function(item) {
          return fromJS(commonCode);
        }
      )
    );
};
const reduceDel = (state, action) => {
  const { commonCode } = action.payload.data;
  let list = state.get("list");
  return state
    .setIn(["form", "uid"], commonCode.uid)
    .set("info", fromJS(commonCode))
    .set(
      "list",
      list.delete(
        list.findIndex(function(item) {
          return item.get("uid") === commonCode.uid;
        })
      )
    );
};
//=============================================================================

// reducer
export default handleActions(
  {
    [LOAD_COMMONCODES]: state => state.set("loading", true),
    ...pender({
      type: GET_COMMONCODES,
      onSuccess: (state, action) => ApiSuccess(state, action, reduceList)
    }),
    ...pender({
      type: GET_COMMONCODE,
      onSuccess: (state, action) => ApiSuccess(state, action, reduceInfo)
    }),
    //-------------------------------------------------------------------------
    [INIT_FORM]: state => state.set("form", defaults.get("form")),
    [LOAD_FORM]: (state, action) => {
      const { info } = action.payload;
      return state
        .set("form", Map(info))
        .setIn(["form", "bcgu"], info.commonCodeGroup.uid)
        .setIn(["form", "bcgn"], info.commonCodeGroup.name);
    },
    [CHANGE_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return state.setIn(["form", name], value);
    },
    ...pender({
      type: ADD_COMMONCODE,
      onSuccess: (state, action) => ApiSuccess(state, action, reduceAdd)
    }),
    ...pender({
      type: PATCH_COMMONCODE,
      onSuccess: (state, action) => ApiSuccess(state, action, reducePatch)
    }),
    ...pender({
      type: DEL_COMMONCODE,
      onSuccess: (state, action) => ApiSuccess(state, action, reduceDel)
    }),
    //-------------------------------------------------------------------------
    [REFRESH_COMMONCODES]: (state, action) => {
      const { uid, name, use } = action.payload;
      let list = state.get("list").map(item => {
        if (item.getIn(["commonCodeGroup", "uid"]) === uid) {
          return item
            .setIn(["commonCodeGroup", "name"], name)
            .setIn(["commonCodeGroup", "use"], use);
        } else {
          return item;
        }
      });
      return state.set("list", list);
    }
  },
  defaults
);
