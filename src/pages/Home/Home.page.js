import React from "react";
import style from "./Home.module.css";
import { UserHeaderLayout, UserMainLayout } from "layout";

const HomePage = (props) => {
  return (
    <div className={style.homePage}>
      <div className={style.header}>
        <UserHeaderLayout />
      </div>
      <div className={style.bodyPart}>
        <UserMainLayout mainTab={"mainHome"} />
      </div>
    </div>
  );
};

export { HomePage };
