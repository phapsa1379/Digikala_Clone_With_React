import React from "react";
import style from "./ProductDetails.module.css";
import { UserHeaderLayout, UserMainLayout } from "layout";
const ProductDetailsPage = (props) => {
  return (
    <div className={style.productDetailsPage}>
      <div className={style.header}>
        <UserHeaderLayout />
      </div>
      <div className={style.bodyPart}>
        <UserMainLayout mainTab={"mainEachProduct"} />
      </div>
    </div>
  );
};

export { ProductDetailsPage };
