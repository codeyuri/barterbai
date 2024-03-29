import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import "./media.css";

import store from "./redux";
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
