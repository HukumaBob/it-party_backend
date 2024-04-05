import React from "react";
import { Banner } from "../../entities/banner";
import style from "./index.module.scss";
export const EventPage = () => {
  return (
    <div className={style.wrapper}>
      <Banner activeIndex={3} />
    </div>
  );
};
