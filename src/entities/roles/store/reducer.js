import { createAction, handleActions } from "redux-actions";

import { pender } from "redux-pender";

import * as api from "./api";
import defaults from "./defaults";

import { Immer as im } from "support/utils";

// action types
const GET_ROLES = "list/GET_ROLES";
//=============================================================================

// action creators
export const getRoles = createAction(GET_ROLES, api.getRoles);
//=============================================================================

// reducer define
const reduceList = (draft, action) => {
  const { roleList, rolePages } = action.payload.data;
  Object.assign(draft, {
    list: roleList,
    pages: rolePages,
    loading: false
  });
};
//=============================================================================

// reducer
export default handleActions(
  {
    ...pender(im(GET_ROLES, reduceList))
  },
  defaults
);
