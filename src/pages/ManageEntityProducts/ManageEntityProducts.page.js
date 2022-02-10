import React from "react";
import style from "./ManageEntityProducts.module.css";
import { AdminHeaderLayout, AdminMainLayout } from "layout";

const ManageEntityProductsPage = (props) => {
  return (
    <div>
      <div className={style.header}>
        <AdminHeaderLayout tab="entities" />
      </div>
      <div className={style.mainPart}>
        <AdminMainLayout mainTab="mainEntities" />
      </div>
    </div>
  );
};

export { ManageEntityProductsPage };
