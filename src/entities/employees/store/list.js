import { createAction, handleActions } from "redux-actions";

import { Map, List, fromJS } from "immutable";
import { pender } from "redux-pender";
import * as api from "./api";

import { Json } from "support/utils";

// action types
const INITIALIZE = "list/INITIALIZE";
const ADD_EMPLOYEE = "list/ADD_EMPLOYEE";
const PATCH_EMPLOYEE = "list/PATCH_EMPLOYEE";
const DEL_EMPLOYEE = "list/DEL_EMPLOYEE";
const START_LOADING = "list/START_LOADING";
const GET_EMPLOYEES = "list/GET_EMPLOYEES";

// action creators
export const initialize = createAction(INITIALIZE);
export const addEmployee = createAction(ADD_EMPLOYEE);
export const patchEmployee = createAction(PATCH_EMPLOYEE);
export const delEmployee = createAction(DEL_EMPLOYEE);
export const startLoading = createAction(START_LOADING);
export const getEmployees = createAction(GET_EMPLOYEES, api.getEmployees);

// initial state
const initialState = Map({
  list: List(),
  genderCodes: List(),
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
    [PATCH_EMPLOYEE]: (state, action) => {
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
    [DEL_EMPLOYEE]: (state, action) => {
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
      type: GET_EMPLOYEES,
      onSuccess: (state, action) => {
        const {
          employeeList,
          employeePages,
          genderCodes
        } = action.payload.data;
        if (genderCodes) {
          let employeeListTrans = employeeList.map(employee => {
            employee.rolejson = Json.parse(employee.rolejson);
            return employee;
          });
          return state
            .set("list", fromJS(employeeListTrans))
            .set("genderCodes", fromJS(genderCodes))
            .set("pages", employeePages)
            .set("loading", false);
        } else return initialState;
      }
    })
  },
  initialState
);
