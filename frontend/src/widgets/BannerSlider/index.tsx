import React from "react";
import { Banner } from "../../entities/banner";
import style from "./index.module.scss";
import { SlideSwitcher } from "../../features/slideSwitcher";

export const BannerSlider = () => {
  return (
    <div className={style.bannerBlock}>
      <Banner />
      <SlideSwitcher />
    </div>
  );
};
