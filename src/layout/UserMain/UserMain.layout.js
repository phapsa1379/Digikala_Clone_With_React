import React from "react";
import style from "./UserMain.module.css";

import {
  HomeLayout,
  ProductsGroupLayout,
  EachProductLayout,
} from "./components";
const UserMainLayout = (props) => {
  let { mainTab } = props;
  return (
    <div className={style.userMainContainer}>
      {mainTab === "mainHome" ? (
        <HomeLayout />
      ) : mainTab === "mainProductsGroup" ? (
        <ProductsGroupLayout />
      ) : (
        <EachProductLayout />
      )}
    </div>
  );
};

export { UserMainLayout };
