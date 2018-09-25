import { createAction, handleActions } from "redux-actions";

import { Map, fromJS } from "immutable";
import { pender } from "redux-pender";
import * as api from "./api";

// action types
const GET_COMMONCODE = "commonCodes/GET_COMMONCODE";

// action creators
export const getCommonCode = createAction(GET_COMMONCODE, api.getCommonCode);

// initial state
const initialState = Map({
  info: Map({})
});

// reducer
export default handleActions(
  {
    ...pender({
      type: GET_COMMONCODE,
      onSuccess: (state, action) => {
        const { info } = action.payload.data;
        return state.set("info", fromJS(info));
      }
    })
  },
  initialState
);
