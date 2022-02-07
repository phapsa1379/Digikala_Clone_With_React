import React from "react";
import style from "./Cart.module.css";
import { UserHeaderLayout } from "layout";

function CartPage(props) {
  return (
    <div className={style.CartPage}>
      <div className={style.header}>
        <UserHeaderLayout />
      </div>
    </div>
  );
}

export { CartPage };
