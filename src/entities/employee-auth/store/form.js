import { createAction, handleActions } from "redux-actions";

import { Map, fromJS } from "immutable";
import { pender } from "redux-pender";

import * as api from "./api";

import { Result } from "common/constant";

// action types
const INITIALIZE = "employeeAuth/INITIALIZE";
const CHANGE_INPUT = "employeeAuth/CHANGE_INPUT";
const CLEAR_EMPLOYEEAUTH = "employeeAuth/CLEAR_EMPLOYEEAUTH";
const GET_EMPLOYEEAUTH = "employeeAuth/GET_EMPLOYEEAUTH";

// action creators
export const initialize = createAction(INITIALIZE);
export const changeInput = createAction(CHANGE_INPUT);
export const clearEmployeeAuth = createAction(CLEAR_EMPLOYEEAUTH);
export const getEmployeeAuth = createAction(
  GET_EMPLOYEEAUTH,
  api.getEmployeeAuth
);

// initial state
const initialState = Map({
  result: Map({
    key: Result.SUCCESS,
    desc: ""
  }),
  form: Map({
    id: "",
    pw: "",
    rk: ""
  }),
  info: Map({
    rk: localStorage.getItem("rk"),
    id: localStorage.getItem("id"),
    firstname: localStorage.getItem("firstname"),
    lastname: localStorage.getItem("lastname"),
    pkm2: localStorage.getItem("pkm2"),
    pke2: localStorage.getItem("pke2")
  })
});

// reducer
export default handleActions(
  {
    [INITIALIZE]: (state, action) => initialState,
    [CHANGE_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return state.setIn(["form", name], value);
    },
    [CLEAR_EMPLOYEEAUTH]: (state, action) => {
      localStorage.setItem("rk", "");
      localStorage.setItem("id", "");
      localStorage.setItem("firstname", "");
      localStorage.setItem("lastname", "");
      localStorage.setItem("pkm2", "");
      localStorage.setItem("pke2", "");
      return initialState;
    },
    ...pender({
      type: GET_EMPLOYEEAUTH,
      onSuccess: (state, action) => {
        const {
          key,
          desc,
          rk,
          id,
          firstname,
          lastname,
          pkm2,
          pke2
        } = action.payload.data;
        if (key === Result.SUCCESS) {
          localStorage.setItem("rk", rk);
          localStorage.setItem("id", id);
          localStorage.setItem("firstname", firstname);
          localStorage.setItem("lastname", lastname);
          localStorage.setItem("pkm2", pkm2);
          localStorage.setItem("pke2", pke2);
          return state
            .set("info", fromJS({ rk, id, firstname, lastname, pkm2, pke2 }))
            .setIn(["result", "key"], key)
            .setIn(["result", "desc"], desc);
        } else {
          return state
            .setIn(["result", "key"], key)
            .setIn(["result", "desc"], desc);
        }
      }
    })
  },
  initialState
);
