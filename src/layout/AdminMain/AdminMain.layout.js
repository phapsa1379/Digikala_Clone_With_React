import React from "react";
import style from "./AdminMain.module.css";
import { ManageProductsLayout } from "./components";
const AdminMainLayout = (props) => {
  return (
    <div className={style.adminMainContainer}>
      <ManageProductsLayout />
    </div>
  );
};

export { AdminMainLayout };
