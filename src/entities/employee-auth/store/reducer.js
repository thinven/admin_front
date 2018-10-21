import { createAction, handleActions } from "redux-actions";

import { pender } from "redux-pender";

import * as api from "./api";
import defaults from "./defaults";

import { Immer as im } from "support/utils";

// action types
const INIT_FORM = "employeeAuth/INIT_FORM";
const CHANGE_INPUT = "employeeAuth/CHANGE_INPUT";
const CLEAR_EMPLOYEEAUTH = "employeeAuth/CLEAR_EMPLOYEEAUTH";
const GET_EMPLOYEEAUTH = "employeeAuth/GET_EMPLOYEEAUTH";
//=============================================================================

// action creators
export const initForm = createAction(INIT_FORM);
export const changeInput = createAction(CHANGE_INPUT);
export const clearEmployeeAuth = createAction(CLEAR_EMPLOYEEAUTH);
export const getEmployeeAuth = createAction(
  GET_EMPLOYEEAUTH,
  api.getEmployeeAuth
);
//=============================================================================

const reduceLogin = (draft, action) => {
  const { rk, id, firstname, lastname, pkm2, pke2 } = action.payload.data;
  localStorage.setItem("rk", rk);
  localStorage.setItem("id", id);
  localStorage.setItem("firstname", firstname);
  localStorage.setItem("lastname", lastname);
  localStorage.setItem("pkm2", pkm2);
  localStorage.setItem("pke2", pke2);
  draft.info = { rk, id, firstname, lastname, pkm2, pke2 };
};
//=============================================================================

// reducer
export default handleActions(
  {
    [INIT_FORM]: im(draft => {
      draft.form = defaults.form;
    }),
    [CHANGE_INPUT]: im((draft, action) => {
      const { name, value } = action.payload;
      draft.form[name] = value;
    }),
    [CLEAR_EMPLOYEEAUTH]: () => {
      localStorage.setItem("rk", "");
      localStorage.setItem("id", "");
      localStorage.setItem("firstname", "");
      localStorage.setItem("lastname", "");
      localStorage.setItem("pkm2", "");
      localStorage.setItem("pke2", "");
      return defaults;
    },
    ...pender(im(GET_EMPLOYEEAUTH, reduceLogin))
  },
  defaults
);
