import { createAction, handleActions } from "redux-actions";

import { Map } from "immutable";
import { pender } from "redux-pender";
import * as api from "./api";

// action types
const INITIALIZE = "employees/INITIALIZE";
const CHANGE_INPUT = "employees/CHANGE_INPUT";
const LOAD_EMPLOYEE = "employees/LOAD_EMPLOYEE";
const ADD_EMPLOYEE = "employees/ADD_EMPLOYEE";
const PATCH_EMPLOYEE = "employees/PATCH_EMPLOYEE";
const DEL_EMPLOYEE = "employees/DEL_EMPLOYEE";

// action creators
export const initialize = createAction(INITIALIZE);
export const changeInput = createAction(CHANGE_INPUT);
export const loadEmployee = createAction(LOAD_EMPLOYEE);
export const addEmployee = createAction(ADD_EMPLOYEE, api.addEmployee);
export const patchEmployee = createAction(PATCH_EMPLOYEE, api.patchEmployee);
export const delEmployee = createAction(DEL_EMPLOYEE, api.delEmployee);

// initial state
const initialState = Map({
  result: Map({
    key: "SUCCESS",
    desc: ""
  }),
  form: Map({
    uid: "",
    firstname: "",
    lastname: "",
    birthday: "",
    gender: 10,
    phone: "",
    email: "",
    id: ""
  })
});

const onSuccess = (state, action) => {
  const { key, desc, employee } = action.payload.data;
  if (key === "SUCCESS") {
    return state
      .setIn(["form", "uid"], employee.uid)
      .setIn(["result", "key"], key)
      .setIn(["result", "desc"], desc);
  } else {
    return state.setIn(["result", "key"], key).setIn(["result", "desc"], desc);
  }
};

// reducer
export default handleActions(
  {
    [INITIALIZE]: (state, action) => initialState,
    [CHANGE_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return state.setIn(["form", name], value);
    },
    [LOAD_EMPLOYEE]: (state, action) => {
      const { info } = action.payload;
      return state.set("form", Map(info));
    },
    ...pender({
      type: ADD_EMPLOYEE,
      onSuccess: onSuccess
    }),
    ...pender({
      type: PATCH_EMPLOYEE,
      onSuccess: onSuccess
    }),
    ...pender({
      type: DEL_EMPLOYEE,
      onSuccess: onSuccess
    })
  },
  initialState
);
