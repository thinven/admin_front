import { createAction, handleActions } from "redux-actions";

import { Map, fromJS } from "immutable";
import { pender } from "redux-pender";
import * as api from "./api";

// action types
const GET_EMPLOYEE = "employees/GET_EMPLOYEE";

// action creators
export const getEmployee = createAction(GET_EMPLOYEE, api.getEmployee);

// initial state
const initialState = Map({
  info: Map({})
});

// reducer
export default handleActions(
  {
    ...pender({
      type: GET_EMPLOYEE,
      onSuccess: (state, action) => {
        const { info } = action.payload.data;
        return state.set("info", fromJS(info));
      }
    })
  },
  initialState
);
