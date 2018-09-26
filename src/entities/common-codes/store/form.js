import { createAction, handleActions } from "redux-actions";

import { Map, fromJS } from "immutable";
import { pender } from "redux-pender";
import * as api from "./api";

// action types
const INITIALIZE = "commonCodes/INITIALIZE";
const CHANGE_INPUT = "commonCodes/CHANGE_INPUT";
const LOAD_COMMONCODE = "commonCodes/LOAD_COMMONCODE";
const ADD_COMMONCODE = "commonCodes/ADD_COMMONCODE";
const PATCH_COMMONCODE = "commonCodes/PATCH_COMMONCODE";
const DEL_COMMONCODE = "commonCodes/DEL_COMMONCODE";

// action creators
export const initialize = createAction(INITIALIZE);
export const changeInput = createAction(CHANGE_INPUT);
export const loadCommonCode = createAction(LOAD_COMMONCODE);
export const addCommonCode = createAction(ADD_COMMONCODE, api.addCommonCode);
export const patchCommonCode = createAction(
  PATCH_COMMONCODE,
  api.patchCommonCode
);
export const delCommonCode = createAction(DEL_COMMONCODE, api.delCommonCode);

// initial state
const initialState = Map({
  result: Map({
    key: "SUCCESS",
    desc: ""
  }),
  form: Map({
    uid: "",
    code: "",
    name: "",
    ordered: 0,
    use: 10,
    bcgu: "",
    bcgn: ""
  }),
  info: Map({})
});

const onSuccess = (state, action) => {
  const { key, desc, commonCode } = action.payload.data;
  if (key === "SUCCESS") {
    return state
      .setIn(["form", "uid"], commonCode.uid)
      .set("info", fromJS(commonCode))
      .setIn(["result", "key"], key)
      .setIn(["result", "desc"], desc);
  } else {
    return state.setIn(["result", "key"], key).setIn(["result", "desc"], desc);
  }
};

// reducer
export default handleActions(
  {
    [INITIALIZE]: (state, action) => initialState,
    [CHANGE_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return state.setIn(["form", name], value);
    },
    [LOAD_COMMONCODE]: (state, action) => {
      const { info } = action.payload;
      return state
        .set("form", Map(info))
        .setIn(["form", "bcgu"], info.commonCodeGroup.uid)
        .setIn(["form", "bcgn"], info.commonCodeGroup.name);
    },
    ...pender({
      type: ADD_COMMONCODE,
      onSuccess: onSuccess
    }),
    ...pender({
      type: PATCH_COMMONCODE,
      onSuccess: onSuccess
    }),
    ...pender({
      type: DEL_COMMONCODE,
      onSuccess: onSuccess
    })
  },
  initialState
);
