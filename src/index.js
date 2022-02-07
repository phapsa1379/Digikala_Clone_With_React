import React from "react";
import ReactDOM from "react-dom";
// import { Provider } from "react-redux";
import { AppRoute } from "routes/App.route";
// import store from "redux/store";
// import { createStore } from "redux";
// import { LoginPage } from "pages/index";

import reportWebVitals from "./reportWebVitals";
import "assets/styles/global.css";
// const store = createStore();
ReactDOM.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <AppRoute />
    {/* </Provider> */}
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
