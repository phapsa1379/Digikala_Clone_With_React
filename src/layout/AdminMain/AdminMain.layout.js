import React from "react";
import style from "./AdminMain.module.css";
import {
  // ManageProductsLayout,
  ManageProducts,
  ManageEntitiesLayout,
  ManageOrders,
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
        <ManageOrders />
      )}
    </div>
  );
};

export { AdminMainLayout };
