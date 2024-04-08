import React from "react";
import style from "./index.module.scss";
import { BannerSlider } from "../../widgets/BannerSlider";
import { FilterBlock } from "../../features/FilterBlock";
import { EventsCatalog } from "../../widgets/EventsCatalog";
import { QuestionsBlock } from "../../widgets/QuestionsBlock";
import { CardBlock } from "../../widgets/CardBlock";
import { Reviews } from "../../widgets/Reviews";

export const MainPage = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <BannerSlider />
        <EventsCatalog />
        <QuestionsBlock />
        <CardBlock title={"Популярные"} />
        <CardBlock title={"Рекомендуемые"} />
        <Reviews />
      </div>
    </div>
  );
};
