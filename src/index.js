import React from "react";
import ReactDOM from "react-dom";
import Root from "./Root";
import registerServiceWorker from "./registerServiceWorker";
import "support/styles/base.scss";

ReactDOM.render(<Root />, document.getElementById("root"));
registerServiceWorker();
