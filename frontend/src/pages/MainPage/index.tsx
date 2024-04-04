import React from "react";
import style from "./index.module.scss";
import { BannerSlider } from "../../widgets/BannerSlider";
import { FilterBlock } from "../../features/FilterBlock";
import { EventsCatalog } from "../../widgets/EventsCatalog";
export const MainPage = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <BannerSlider />
        <EventsCatalog />
      </div>
    </div>
  );
};
