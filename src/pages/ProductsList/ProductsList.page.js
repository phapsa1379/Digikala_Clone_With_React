import React from "react";
import style from "./ProductsList.module.css";
import { UserHeaderLayout, UserMainLayout } from "layout";
const ProductsListPage = (props) => {
  return (
    <div className={style.productListPage}>
      <div className={style.header}>
        <UserHeaderLayout />
      </div>
      <div className={style.bodyPart}>
        <UserMainLayout mainTab={"mainProductsGroup"} />
      </div>
    </div>
  );
};

export { ProductsListPage };
