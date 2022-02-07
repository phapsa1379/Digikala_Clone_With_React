import React from "react";
import style from "./FinalizePurchase.module.css";
import { UserHeaderLayout } from "layout";

function FinalizePurchasePage(props) {
  return (
    <div>
      <div className={style.header}>
        <UserHeaderLayout />
      </div>
    </div>
  );
}

export { FinalizePurchasePage };
