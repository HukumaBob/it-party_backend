import React from "react";
import { EventCard } from "../../shared/card";
import style from "./index.module.scss";
import { TPopularOrRecomendedEvents } from "../../app/types/types";
export const PopularOrRecomendedEvents = ({
  title,
}: TPopularOrRecomendedEvents) => {
  return (
    <div className={style.container}>
      <section>
        <h2 className={style.title}>{title}</h2>
      </section>
      <div className={style.cardContainer}>
        <EventCard
          title='Girls in IT Session Москва'
          description='Наша конференция для девушек в IT будет незабываемой и полной новых открытий. Вы не только познакомитесь c новыми людьми…'
          img=''
          date='28 апреля 2024'
          time='12:00'
        />

        <EventCard
          title='Girls in IT Session Москва'
          description='Наша конференция для девушек в IT будет незабываемой и полной новых открытий. Вы не только познакомитесь c новыми людьми…'
          img=''
          date='28 апреля 2024'
          time='12:00'
        />

        <EventCard
          title='Girls in IT Session Москва'
          description='Наша конференция для девушек в IT будет незабываемой и полной новых открытий. Вы не только познакомитесь c новыми людьми…'
          img=''
          date='28 апреля 2024'
          time='12:00'
        />
      </div>
    </div>
  );
};
