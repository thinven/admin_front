import { createAction, handleActions } from "redux-actions";

import { pender } from "redux-pender";

import * as api from "./api";
import defaults from "./defaults";

import { Immer as im } from "support/utils";

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
const reduceList = (draft, action) => {
  const { commonCodeList, commonCodePages, useCodes } = action.payload.data;
  Object.assign(draft, {
    list: commonCodeList,
    useCodes: useCodes,
    pages: commonCodePages,
    loading: false
  });
};
const reduceInfo = (draft, action) => {
  const { info } = action.payload.data;
  draft.info = info;
};
//-----------------------------------------------------------------------------
const reduceAdd = (draft, action) => {
  const { commonCode } = action.payload.data;
  draft.form.uid = commonCode.uid;
  draft.info = commonCode;
  draft.list = draft.list.unshift(commonCode);
};
const reducePatch = (draft, action) => {
  const { commonCode } = action.payload.data;
  let idx = draft.list.findIndex(item => item.uid === commonCode.uid);
  draft.form.uid = commonCode.uid;
  draft.info = commonCode;
  draft.list[idx] = commonCode;
};
const reduceDel = (draft, action) => {
  const { commonCode } = action.payload.data;
  let idx = draft.list.findIndex(item => item.uid === commonCode.uid);
  draft.form.uid = commonCode.uid;
  draft.info = commonCode;
  draft.list.splice(idx, 1);
};
//=============================================================================

// reducer
export default handleActions(
  {
    [LOAD_COMMONCODES]: im(draft => {
      draft.loading = true;
    }),
    ...pender(im(GET_COMMONCODES, reduceList)),
    ...pender(im(GET_COMMONCODE, reduceInfo)),
    //-------------------------------------------------------------------------
    [INIT_FORM]: im(draft => {
      draft.form = defaults.form;
    }),
    [LOAD_FORM]: im((draft, action) => {
      const { info } = action.payload;
      draft.form = info;
      Object.assign(draft.form, {
        bcgu: info.commonCodeGroup.uid,
        bcgn: info.commonCodeGroup.name
      });
    }),
    [CHANGE_INPUT]: im((draft, action) => {
      const { name, value } = action.payload;
      draft.form[name] = value;
    }),
    ...pender(im(ADD_COMMONCODE, reduceAdd)),
    ...pender(im(PATCH_COMMONCODE, reducePatch)),
    ...pender(im(DEL_COMMONCODE, reduceDel)),
    //-------------------------------------------------------------------------
    [REFRESH_COMMONCODES]: im((draft, action) => {
      const { uid, name, use } = action.payload;
      draft.list = draft.list.map(item => {
        if (item.commonCodeGroup.uid === uid) {
          item.commonCodeGroup.name = name;
          item.commonCodeGroup.use = use;
        }
        return item;
      });
    })
  },
  defaults
);
