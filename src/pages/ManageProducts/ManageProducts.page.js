import React from "react";
import style from "./ManageProducts.module.css";
import { AdminHeaderLayout } from "layout";
import { AdminMainLayout } from "layout";
const ManageProductsPage = (props) => {
  return (
    <div>
      <div className={style.header}>
        <AdminHeaderLayout tab="products" />
      </div>
      <div className={style.mainPart}>
        <AdminMainLayout />
      </div>
    </div>
  );
};

export { ManageProductsPage };
