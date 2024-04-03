import React from "react";
import style from "./index.module.scss";
import { BannerSlider } from "../../widgets/BannerSlider";
import { FilterBlock } from "../../widgets/FilterBlock";
export const MainPage = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <BannerSlider />
        <FilterBlock />
      </div>
    </div>
  );
};
