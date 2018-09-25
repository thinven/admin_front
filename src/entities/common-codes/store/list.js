import { createAction, handleActions } from "redux-actions";

import { Map, List, fromJS } from "immutable";
import { pender } from "redux-pender";
import * as api from "./api";

// action types
const INITIALIZE = "list/INITIALIZE";
const ADD_COMMONCODE = "list/ADD_COMMONCODE";
const PATCH_COMMONCODE = "list/PATCH_COMMONCODE";
const DEL_COMMONCODE = "list/DEL_COMMONCODE";
const START_LOADING = "list/START_LOADING";
const GET_COMMONCODES = "list/GET_COMMONCODES";

// action creators
export const initialize = createAction(INITIALIZE);
export const addCommonCode = createAction(ADD_COMMONCODE);
export const patchCommonCode = createAction(PATCH_COMMONCODE);
export const delCommonCode = createAction(DEL_COMMONCODE);
export const startLoading = createAction(START_LOADING);
export const getCommonCodes = createAction(GET_COMMONCODES, api.getCommonCodes);

// initial state
const initialState = Map({
  list: List(),
  useCodes: List(),
  pages: null,
  loading: false
});

// reducer
export default handleActions(
  {
    [INITIALIZE]: () => initialState,
    [ADD_COMMONCODE]: (state, action) => {
      return state.set(
        "list",
        state.get("list").unshift(fromJS(action.payload))
      );
    },
    [PATCH_COMMONCODE]: (state, action) => {
      const { uid } = action.payload;
      let list = state.get("list");
      return state.set(
        "list",
        list.update(
          list.findIndex(function(item) {
            return item.get("uid") === uid;
          }),
          function(item) {
            return fromJS(action.payload);
          }
        )
      );
    },
    [DEL_COMMONCODE]: (state, action) => {
      const { uid } = action.payload;
      let list = state.get("list");
      return state.set(
        "list",
        list.delete(
          list.findIndex(function(item) {
            return item.get("uid") === uid;
          })
        )
      );
    },
    [START_LOADING]: (state, action) => {
      return state.set("loading", true);
    },
    ...pender({
      type: GET_COMMONCODES,
      onSuccess: (state, action) => {
        const {
          commonCodeList,
          commonCodePages,
          useCodes
        } = action.payload.data;
        return state
          .set("list", fromJS(commonCodeList))
          .set("useCodes", fromJS(useCodes))
          .set("pages", commonCodePages)
          .set("loading", false);
      }
    })
  },
  initialState
);
