import React from "react";
import style from "./SkeletonCard.module.css";
import { SkeletonImage } from "skeleton-elements/react";
import { SkeletonBlock } from "skeleton-elements/react";
// import "./styles.css";
import "skeleton-elements/css";

function SkeletonCard() {
  return (
    <div className={style.skeletonCard}>
      <div className={style.skeletonCardImage}>
        <SkeletonImage
          effect={"wave"}
          width="380"
          height="250"
          borderRadius="20px"
        />
      </div>
      <div className={style.skeletonCardContent}>
        <SkeletonBlock
          tag="p"
          height="30px"
          width="380px"
          effect={"wave"}
          borderRadius="20px"
        />{" "}
        <SkeletonBlock
          tag="p"
          height="30px"
          width="380px"
          effect={"wave"}
          borderRadius="20px"
        />{" "}
        <SkeletonBlock
          tag="p"
          height="30px"
          width="380px"
          effect={"wave"}
          borderRadius="20px"
        />{" "}
        <SkeletonBlock
          tag="p"
          height="30px"
          width="380px"
          effect={"wave"}
          borderRadius="20px"
        />{" "}
        <SkeletonBlock
          tag="p"
          height="30px"
          width="380px"
          effect={"wave"}
          borderRadius="20px"
        />
        <SkeletonBlock
          tag="p"
          height="30px"
          width="380px"
          effect={"wave"}
          borderRadius="20px"
        />
        <SkeletonBlock
          tag="p"
          height="30px"
          width="200px"
          effect={"wave"}
          borderRadius="20px"
        />
      </div>
      <div className={style.skeletonButtons}>
        <SkeletonBlock
          tag="p"
          height="40px"
          width="120px"
          effect={"wave"}
          borderRadius="10px"
        />
        <SkeletonBlock
          tag="p"
          height="40px"
          width="120px"
          effect={"wave"}
          borderRadius="10px"
        />
      </div>
    </div>
  );
}

export { SkeletonCard };
