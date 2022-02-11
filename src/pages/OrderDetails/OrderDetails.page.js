import React from "react";
import style from "./OrderDetails.module.css";
import { AdminHeaderLayout,AdminMainLayout } from "layout";
const OrderDetailsPage = (props) => {
  return (
    <div>
      <div className={style.header}>
        <AdminHeaderLayout tab="orders" />
      </div>
      <div className={style.mainPart}>
        <AdminMainLayout mainTab="mainOrders" />
      </div>
    </div>
  );
};

export { OrderDetailsPage };
