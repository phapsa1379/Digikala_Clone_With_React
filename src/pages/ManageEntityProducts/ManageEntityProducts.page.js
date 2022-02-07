import React from "react";
import style from "./ManageEntityProducts.module.css";
import { AdminHeaderLayout } from "layout";

const ManageEntityProductsPage = (props) => {
  return (
    <div>
      <div className={style.header}>
        <AdminHeaderLayout tab="entities" />
      </div>
    </div>
  );
};

export { ManageEntityProductsPage };
