import React from "react";
import style from "./AdminMain.module.css";
import {
  ManageProductsLayout,
  ManageEntitiesLayout,
  ManageOrdersLayout,
} from "./components";
const AdminMainLayout = (props) => {
  let { mainTab } = props;
  return (
    <div className={style.adminMainContainer}>
      {mainTab === "mainProducts" ? (
        <ManageProductsLayout />
      ) : mainTab === "mainEntities" ? (
        <ManageEntitiesLayout />
      ) : (
        <ManageOrdersLayout />
      )}
    </div>
  );
};

export { AdminMainLayout };
