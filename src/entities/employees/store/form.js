import { createAction, handleActions } from "redux-actions";

import { Map } from "immutable";
import { pender } from "redux-pender";
import * as api from "./api";

// action types
const INITIALIZE = "employees/INITIALIZE";
const CHANGE_INPUT = "employees/CHANGE_INPUT";
const ADD_EMPLOYEE = "employees/ADD_EMPLOYEE";

// action creators
export const initialize = createAction(INITIALIZE);
export const changeInput = createAction(CHANGE_INPUT);
export const addEmployee = createAction(ADD_EMPLOYEE, api.addEmployee);

// initial state
const initialState = Map({
  form: Map({
    uid: "",
    firstname: "",
    lastname: "",
    birthday: "",
    gender: 10,
    phone: "",
    email: "",
    id: "",
    pw: ""
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
    ...pender({
      type: ADD_EMPLOYEE,
      onSuccess: (state, action) => {
        const { employee } = action.payload.data;
        return state.setIn(["form", "uid"], employee.uid);
      }
    })
  },
  initialState
);
