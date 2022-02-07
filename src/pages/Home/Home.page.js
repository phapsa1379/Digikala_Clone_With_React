import React from "react";
import style from "./Home.module.css";
import { UserHeaderLayout } from "layout";

const HomePage = (props) => {
  return (
    <div>
      <div className={style.header}>
        <UserHeaderLayout />
      </div>
    </div>
  );
};

export { HomePage };
