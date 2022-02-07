import React from "react";
import style from "./ManageProducts.module.css";
import { AdminHeaderLayout } from "layout";
const ManageProductsPage = (props) => {
  return (
    <div>
      <div className={style.header}>
        <AdminHeaderLayout tab="products" />
      </div>
    </div>
  );
};

export { ManageProductsPage };
