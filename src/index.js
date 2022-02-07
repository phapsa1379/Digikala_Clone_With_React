import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { AppRoute } from "routes/App.route";
import store from "redux/store";
import { LoginPage } from "pages/index";
// import { UserHeaderLayout } from "layout";

// import reportWebVitals from "./reportWebVitals";
import "assets/styles/global.css";

ReactDOM.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    {/* <AppRoute /> */}
    <LoginPage />
    {/* <UserHeaderLayout /> */}

    {/* </Provider> */}
  </React.StrictMode>,
  document.getElementById("root")
);

// reportWebVitals();
