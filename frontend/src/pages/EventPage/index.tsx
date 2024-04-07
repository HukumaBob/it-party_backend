import React from "react";
import { Banner } from "../../entities/banner";
import style from "./index.module.scss";
import { MainTextEvents } from "../../features/mainTextEvents";
import { Gallery } from "../../shared/Gallery";
import { AboutBlock } from "../../features/AboutBlock";
import { Speakers } from "../../shared/speakers";
import { HowToGet } from "../../shared/howToGet";
export const EventPage = () => {
  const random = Math.round(Math.random() * 3);

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.banner}>
          <Banner activeIndex={random} />
        </div>
        <MainTextEvents />
        <Gallery />
        <AboutBlock />
        <Speakers />
        <HowToGet />
      </div>
    </div>
  );
};
