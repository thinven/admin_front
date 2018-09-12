import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import configure from "support/reducer/configure";
import App from "./App";

const store = configure();

const Root = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
};

export default Root;
