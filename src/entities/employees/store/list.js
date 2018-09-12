import { createAction, handleActions } from "redux-actions";

import { Map, List, fromJS } from "immutable";
import { pender } from "redux-pender";
import * as api from "./api";

// action types
const INITIALIZE = "list/INITIALIZE";
const ADD_EMPLOYEE = "list/ADD_EMPLOYEE";
const START_LOADING = "list/START_LOADING";
const GET_EMPLOYEES = "list/GET_EMPLOYEES";

// action creators
export const initialize = createAction(INITIALIZE);
export const addEmployee = createAction(ADD_EMPLOYEE);
export const startLoading = createAction(START_LOADING);
export const getEmployees = createAction(GET_EMPLOYEES, api.getEmployees);

// initial state
const initialState = Map({
  list: List(),
  pages: null,
  loading: false
});

// reducer
export default handleActions(
  {
    [INITIALIZE]: () => initialState,
    [ADD_EMPLOYEE]: (state, action) => {
      return state.set(
        "list",
        state.get("list").unshift(fromJS(action.payload))
      );
    },
    [START_LOADING]: (state, action) => {
      return state.set("loading", true);
    },
    ...pender({
      type: GET_EMPLOYEES,
      onSuccess: (state, action) => {
        const { employeeList, employeePages } = action.payload.data;
        return state
          .set("list", fromJS(employeeList))
          .set("pages", employeePages)
          .set("loading", false);
      }
    })
  },
  initialState
);
