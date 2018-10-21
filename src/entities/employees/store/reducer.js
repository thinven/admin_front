import { createAction, handleActions } from "redux-actions";

import { pender } from "redux-pender";

import * as api from "./api";
import defaults from "./defaults";

import { Json, Immer as im } from "support/utils";

// action types
const LOAD_EMPLOYEES = "employees/LOAD_EMPLOYEES";
const GET_EMPLOYEES = "employees/GET_EMPLOYEES";
const GET_EMPLOYEE = "employees/GET_EMPLOYEE";
//-----------------------------------------------------------------------------
const INIT_FORM = "employees/INIT_FORM";
const LOAD_FORM = "employees/LOAD_FORM";
const CHANGE_INPUT = "employees/CHANGE_INPUT";
const ADD_EMPLOYEE = "employees/ADD_EMPLOYEE";
const PATCH_EMPLOYEE = "employees/PATCH_EMPLOYEE";
const DEL_EMPLOYEE = "employees/DEL_EMPLOYEE";
//=============================================================================

// action creators
export const loadEmployees = createAction(LOAD_EMPLOYEES);
export const getEmployees = createAction(GET_EMPLOYEES, api.getEmployees);
export const getEmployee = createAction(GET_EMPLOYEE, api.getEmployee);
//-----------------------------------------------------------------------------
export const initForm = createAction(INIT_FORM);
export const loadForm = createAction(LOAD_FORM);
export const changeInput = createAction(CHANGE_INPUT);
export const addEmployee = createAction(ADD_EMPLOYEE, api.addEmployee);
export const patchEmployee = createAction(PATCH_EMPLOYEE, api.patchEmployee);
export const delEmployee = createAction(DEL_EMPLOYEE, api.delEmployee);
//=============================================================================

const reduceList = (draft, action) => {
  const { employeeList, employeePages, genderCodes } = action.payload.data;
  let employeeListTrans = employeeList.map(employee => {
    employee.rolejson = Json.parse(employee.rolejson);
    return employee;
  });
  Object.assign(draft, {
    list: employeeListTrans,
    genderCodes: genderCodes,
    pages: employeePages,
    loading: false
  });
};
const reduceInfo = (draft, action) => {
  const { info } = action.payload.data;
  Object.assign(draft, {
    info: info
  });
};
//-----------------------------------------------------------------------------
const reduceAdd = (draft, action) => {
  const { employee } = action.payload.data;
  draft.form.uid = employee.uid;
  draft.list = draft.list.unshift(employee);
};
const reducePatch = (draft, action) => {
  const { employee } = action.payload.data;
  employee.rolejson = Json.parse(employee.rolejson);
  let idx = draft.list.findIndex(item => item.uid === employee.uid);
  draft.form.uid = employee.uid;
  draft.list[idx] = employee;
};
const reduceDel = (draft, action) => {
  const { employee } = action.payload.data;
  let idx = draft.list.findIndex(item => item.uid === employee.uid);
  draft.form.uid = employee.uid;
  draft.list.splice(idx, 1);
};
//=============================================================================

// reducer
export default handleActions(
  {
    [LOAD_EMPLOYEES]: im(draft => {
      draft.loading = true;
    }),
    ...pender(im(GET_EMPLOYEES, reduceList)),
    //-------------------------------------------------------------------------
    ...pender(im(GET_EMPLOYEE, reduceInfo)),
    //-------------------------------------------------------------------------
    [INIT_FORM]: im(draft => {
      draft.form = defaults.form;
    }),
    [LOAD_FORM]: im((draft, action) => {
      draft.form = action.payload.info;
    }),
    [CHANGE_INPUT]: im((draft, action) => {
      const { name, value } = action.payload;
      draft.form[name] = value;
    }),
    ...pender(im(ADD_EMPLOYEE, reduceAdd)),
    ...pender(im(PATCH_EMPLOYEE, reducePatch)),
    ...pender(im(DEL_EMPLOYEE, reduceDel))
  },
  defaults
);
