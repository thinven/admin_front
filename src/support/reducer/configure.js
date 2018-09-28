import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import penderMiddleware from "redux-pender";

import * as commonCodeGroups from "entities/common-code-groups/store";
import * as commonCodes from "entities/common-codes/store";
import * as roles from "entities/roles/store";
import * as employees from "entities/employees/store";

const allReducers = Object.assign(
  {},
  commonCodeGroups,
  commonCodes,
  roles,
  employees
);

const reducers = combineReducers(allReducers);
const middlewares = [penderMiddleware()];

// 개발 모드일 때만 Redux Devtools를 적용합니다.
const isDev = process.env.NODE_ENV === "development";
const devtools = isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devtools || compose;

// preloadedState는 추후 서버사이드 렌더링을 했을 때 전달받는 초기 상태입니다.
const configure = preloadedState =>
  createStore(
    reducers,
    preloadedState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

export default configure;
