import React from "react";
import style from "./OrderDetails.module.css";
import { AdminHeaderLayout } from "layout";
const OrderDetailsPage = (props) => {
  return <div>
     <div className={style.header}>
        <AdminHeaderLayout tab="orders" />
      </div>
  </div>;
};

export { OrderDetailsPage };
