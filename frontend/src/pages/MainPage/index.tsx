import React from "react";
import style from "./index.module.scss";
import { BannerSlider } from "../../widgets/BannerSlider";
export const MainPage = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <BannerSlider />
      </div>
    </div>
  );
};
