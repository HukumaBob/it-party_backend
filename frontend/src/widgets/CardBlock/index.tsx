import React from "react";
import { EventCard } from "../../shared/card";
import style from "./index.module.scss";
import { TPopularOrRecomendedEvents } from "../../app/types/types";
import { PopularMock } from "../../app/mocks/popularMocks";
import { RecomendationMock } from "../../app/mocks/recomendationMocks";
export const CardBlock = ({ title }: TPopularOrRecomendedEvents) => {
  return (
    <div className={style.container}>
      <section>
        <h2 className={style.title}>{title}</h2>
      </section>
      <div className={style.cardContainer}>
        {title === "Популярные"
          ? PopularMock.map((el) => (
              <EventCard
                title={el.title}
                description={el.description}
                date={el.date}
                id={el.id}
                img={el.img}
                time={el.time}
              />
            ))
          : RecomendationMock.map((el) => (
              <EventCard
                title={el.title}
                description={el.description}
                date={el.date}
                id={el.id}
                img={el.img}
                time={el.time}
              />
            ))}
      </div>
    </div>
  );
};
