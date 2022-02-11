import React from "react";
import style from "./AdminMain.module.css";
import {
  // ManageProductsLayout,
  ManageProducts,
  ManageEntitiesLayout,
  ManageOrdersLayout,
} from "./components";
const AdminMainLayout = (props) => {
  let { mainTab } = props;
  return (
    <div className={style.adminMainContainer}>
      {mainTab === "mainProducts" ? (
        <ManageProducts />
      ) : mainTab === "mainEntities" ? (
        <ManageEntitiesLayout />
      ) : (
        <ManageOrdersLayout />
      )}
    </div>
  );
};

export { AdminMainLayout };
