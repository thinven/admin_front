import { createAction, handleActions } from "redux-actions";

import { Map, List, fromJS } from "immutable";
import { pender } from "redux-pender";
import * as api from "./api";

// action types
const GET_COMMONCODEGROUPS = "list/GET_COMMONCODEGROUPS";

// action creators
export const getCommonCodeGroups = createAction(
  GET_COMMONCODEGROUPS,
  api.getCommonCodeGroups
);

// initial state
const initialState = Map({
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
          commonCodeGroupList,
          commonCodeGroupPages
        } = action.payload.data;
        if (commonCodeGroupList)
          return state
            .set("list", fromJS(commonCodeGroupList))
            .set("pages", commonCodeGroupPages)
            .set("loading", false);
        else return initialState;
      }
    })
  },
  initialState
);
