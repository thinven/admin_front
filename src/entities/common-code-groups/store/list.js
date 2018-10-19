import { createAction, handleActions } from "redux-actions";

import { Map, List, fromJS } from "immutable";
import { pender } from "redux-pender";
import * as api from "./api";

import { Result } from "common/constant";

// action types
const GET_COMMONCODEGROUPS = "list/GET_COMMONCODEGROUPS";

// action creators
export const getCommonCodeGroups = createAction(
  GET_COMMONCODEGROUPS,
  api.getCommonCodeGroups
);

// initial state
const initialState = Map({
  result: Map({
    key: Result.SUCCESS,
    desc: ""
  }),
  list: List(),
  pages: null,
  loading: false
});

// reducer
export default handleActions(
  {
    ...pender({
      type: GET_COMMONCODEGROUPS,
      onSuccess: (state, action) => {
        const {
          key,
          desc,
          commonCodeGroupList,
          commonCodeGroupPages
        } = action.payload.data;
        if (key === Result.SUCCESS) {
          return state
            .set("list", fromJS(commonCodeGroupList))
            .set("pages", commonCodeGroupPages)
            .set("loading", false);
        } else {
          return state
            .setIn(["result", "key"], key)
            .setIn(["result", "desc"], desc);
        }
      }
    })
  },
  initialState
);
