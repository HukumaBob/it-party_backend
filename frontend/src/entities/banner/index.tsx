import React from "react";
import style from "./index.module.scss";
import banner_green from "../../app/assets/image/banners/banner_green.png";
export const Banner = () => {
  return (
    <div className={style.banner}>
      <span className={style.box}></span>
      <span className={style.line}>
        15 АПРЕЛЯ <span className={style.city}>/ КИРОВ</span>{" "}
      </span>
      <img src={banner_green} alt='' />
      <span className={style.title}>DevOps Con</span>
      <span className={style.subTitle}>24»</span>
    </div>
  );
};
