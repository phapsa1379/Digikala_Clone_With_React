import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { AppRoute } from "routes/App.route";
import store from "redux/store";
import { UserHeaderLayout } from "layout/UserHeader/UserHeader.layout";
// import reportWebVitals from "./reportWebVitals";
import "assets/styles/global.css";

ReactDOM.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    {/* <AppRoute /> */}
    <UserHeaderLayout />
    {/* </Provider> */}
  </React.StrictMode>,
  document.getElementById("root")
);

// reportWebVitals();
