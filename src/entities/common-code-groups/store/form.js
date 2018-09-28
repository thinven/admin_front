import { createAction, handleActions } from "redux-actions";

import { Map, fromJS } from "immutable";
import { pender } from "redux-pender";
import * as api from "./api";

// action types
const INITIALIZE = "commonCodeGroups/INITIALIZE";
const CHANGE_INPUT = "commonCodeGroups/CHANGE_INPUT";
const LOAD_COMMONCODEGROUP = "commonCodeGroups/LOAD_COMMONCODEGROUP";
const ADD_COMMONCODEGROUP = "commonCodeGroups/ADD_COMMONCODEGROUP";
const PATCH_COMMONCODEGROUP = "commonCodeGroups/PATCH_COMMONCODEGROUP";
const DEL_COMMONCODEGROUP = "commonCodeGroups/DEL_COMMONCODEGROUP";

// action creators
export const initialize = createAction(INITIALIZE);
export const changeInput = createAction(CHANGE_INPUT);
export const loadCommonCodeGroup = createAction(LOAD_COMMONCODEGROUP);
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

// initial state
const initialState = Map({
  result: Map({
    key: "SUCCESS",
    desc: ""
  }),
  form: Map({
    uid: "",
    name: "",
    ordered: 0,
    use: 10
  }),
  info: Map({})
});

const onSuccess = (state, action) => {
  const { key, desc, commonCodeGroup } = action.payload.data;
  if (key === "SUCCESS") {
    return state
      .setIn(["form", "uid"], commonCodeGroup.uid)
      .set("info", fromJS(commonCodeGroup))
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
    [LOAD_COMMONCODEGROUP]: (state, action) => {
      const { info } = action.payload;
      return state.set("form", Map(info));
    },
    ...pender({
      type: ADD_COMMONCODEGROUP,
      onSuccess: onSuccess
    }),
    ...pender({
      type: PATCH_COMMONCODEGROUP,
      onSuccess: onSuccess
    }),
    ...pender({
      type: DEL_COMMONCODEGROUP,
      onSuccess: onSuccess
    })
  },
  initialState
);
