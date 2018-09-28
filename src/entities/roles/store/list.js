import { createAction, handleActions } from "redux-actions";

import { Map, List, fromJS } from "immutable";
import { pender } from "redux-pender";
import * as api from "./api";

// action types
const GET_ROLES = "list/GET_ROLES";

// action creators
export const getRoles = createAction(GET_ROLES, api.getRoles);

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
      type: GET_ROLES,
      onSuccess: (state, action) => {
        const { roleList, rolePages } = action.payload.data;
        return state
          .set("list", fromJS(roleList))
          .set("pages", rolePages)
          .set("loading", false);
      }
    })
  },
  initialState
);
