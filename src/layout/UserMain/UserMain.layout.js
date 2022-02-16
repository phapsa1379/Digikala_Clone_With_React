import React from "react";
import style from "./UserMain.module.css";
// import {
//   // ManageProductsLayout,
//   ManageProducts,
//   ManageEntitiesLayout,
//   ManageOrdersLayout,
// } from "./components";
const UserMainLayout = (props) => {
  let { mainTab } = props;
  return (
    <div className={style.userMainContainer}>
      {/* {mainTab === "mainProducts" ? (
        <ManageProducts />
      ) : mainTab === "mainEntities" ? (
        <ManageEntitiesLayout />
      ) : (
        <ManageOrdersLayout />
      )} */}
    </div>
  );
};

export { UserMainLayout };
