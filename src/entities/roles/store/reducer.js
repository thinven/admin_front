import { createAction, handleActions } from "redux-actions";

import { fromJS } from "immutable";
import { pender } from "redux-pender";

import * as api from "./api";
import defaults from "./defaults";

import { ApiSuccess } from "support/utils";

// action types
const GET_ROLES = "list/GET_ROLES";
//=============================================================================

// action creators
export const getRoles = createAction(GET_ROLES, api.getRoles);
//=============================================================================

// reducer define
const listSuccess = (state, action) => {
  const { roleList, rolePages } = action.payload.data;
  return state
    .set("list", fromJS(roleList))
    .set("pages", rolePages)
    .set("loading", false);
};
//=============================================================================

// reducer
export default handleActions(
  {
    ...pender({
      type: GET_ROLES,
      onSuccess: (state, action) => ApiSuccess(state, action, listSuccess)
    })
  },
  defaults
);
