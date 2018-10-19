import { createAction, handleActions } from "redux-actions";

import { fromJS } from "immutable";
import { pender } from "redux-pender";

import * as api from "./api";
import defaults from "./defaults";

import { Json, ApiSuccess } from "support/utils";

// action types
const LOAD_EMPLOYEES = "employees/LOAD_EMPLOYEES";
const GET_EMPLOYEES = "employees/GET_EMPLOYEES";
const LOAD_EMPLOYEE = "employees/LOAD_EMPLOYEE";
const GET_EMPLOYEE = "employees/GET_EMPLOYEE";
//-----------------------------------------------------------------------------
const INIT_FORM = "employees/INIT_FORM";
const CHANGE_INPUT = "employees/CHANGE_INPUT";
const ADD_EMPLOYEE = "employees/ADD_EMPLOYEE";
const PATCH_EMPLOYEE = "employees/PATCH_EMPLOYEE";
const DEL_EMPLOYEE = "employees/DEL_EMPLOYEE";
//=============================================================================

// action creators
export const loadEmployees = createAction(LOAD_EMPLOYEES);
export const getEmployees = createAction(GET_EMPLOYEES, api.getEmployees);
export const loadEmployee = createAction(LOAD_EMPLOYEE);
export const getEmployee = createAction(GET_EMPLOYEE, api.getEmployee);
//-----------------------------------------------------------------------------
export const initForm = createAction(INIT_FORM);
export const changeInput = createAction(CHANGE_INPUT);
export const addEmployee = createAction(ADD_EMPLOYEE, api.addEmployee);
export const patchEmployee = createAction(PATCH_EMPLOYEE, api.patchEmployee);
export const delEmployee = createAction(DEL_EMPLOYEE, api.delEmployee);
//=============================================================================

const reduceList = (state, action) => {
  const { employeeList, employeePages, genderCodes } = action.payload.data;
  let employeeListTrans = employeeList.map(employee => {
    employee.rolejson = Json.parse(employee.rolejson);
    return employee;
  });
  return state
    .set("list", fromJS(employeeListTrans))
    .set("genderCodes", fromJS(genderCodes))
    .set("pages", employeePages)
    .set("loading", false);
};
const reduceInfo = (state, action) => {
  const { info } = action.payload.data;
  return state.set("info", fromJS(info));
};
//-----------------------------------------------------------------------------
const reduceAdd = (state, action) => {
  const { employee } = action.payload.data;
  return state
    .setIn(["form", "uid"], employee.uid)
    .set("list", state.get("list").unshift(fromJS(employee)));
};
const reducePatch = (state, action) => {
  const { employee } = action.payload.data;
  let list = state.get("list");
  return state.setIn(["form", "uid"], employee.uid).set(
    "list",
    list.update(
      list.findIndex(function(item) {
        return item.get("uid") === employee.uid;
      }),
      function(item) {
        employee.rolejson = Json.parse(employee.rolejson);
        return fromJS(employee);
      }
    )
  );
};
const reduceDel = (state, action) => {
  const { employee } = action.payload.data;
  let list = state.get("list");
  return state.setIn(["form", "uid"], employee.uid).set(
    "list",
    list.delete(
      list.findIndex(function(item) {
        return item.get("uid") === employee.uid;
      })
    )
  );
};
//=============================================================================

// reducer
export default handleActions(
  {
    [LOAD_EMPLOYEES]: state => state.set("loading", true),
    ...pender({
      type: GET_EMPLOYEES,
      onSuccess: (state, action) => ApiSuccess(state, action, reduceList)
    }),
    //-------------------------------------------------------------------------
    [LOAD_EMPLOYEE]: (state, action) => {
      const { info } = action.payload;
      return state.set("form", fromJS(info));
    },
    ...pender({
      type: GET_EMPLOYEE,
      onSuccess: (state, action) => ApiSuccess(state, action, reduceInfo)
    }),
    //-------------------------------------------------------------------------
    [INIT_FORM]: state => state.set("form", defaults.get("form")),
    [CHANGE_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return state.setIn(["form", name], value);
    },
    ...pender({
      type: ADD_EMPLOYEE,
      onSuccess: (state, action) => ApiSuccess(state, action, reduceAdd)
    }),
    ...pender({
      type: PATCH_EMPLOYEE,
      onSuccess: (state, action) => ApiSuccess(state, action, reducePatch)
    }),
    ...pender({
      type: DEL_EMPLOYEE,
      onSuccess: (state, action) => ApiSuccess(state, action, reduceDel)
    })
  },
  defaults
);
