import React from "react";
import { FilterBlock } from "../../features/FilterBlock";
import style from "./index.module.scss";
import { EventCard } from "../../shared/card";
export const EventsCatalog = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.filterBlock}>
        <FilterBlock />
      </div>
      <div className={style.cardsBlock}>
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
    </div>
  );
};
