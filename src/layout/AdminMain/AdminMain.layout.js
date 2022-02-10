import React from "react";
import style from "./AdminMain.module.css";
import { ManageProductsLayout, ManageEntitiesLayout } from "./components";
const AdminMainLayout = (props) => {
  let { mainTab } = props;
  return (
    <div className={style.adminMainContainer}>
      {mainTab === "mainProducts" ? (
        <ManageProductsLayout />
      ) : (
        <ManageEntitiesLayout />
      )}
    </div>
  );
};

export { AdminMainLayout };
