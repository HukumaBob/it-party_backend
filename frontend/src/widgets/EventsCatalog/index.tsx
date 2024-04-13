import React, { useEffect } from "react";
import { FilterBlock } from "../../features/FilterBlock";
import style from "./index.module.scss";
import { EventCard } from "../../shared/card";
import { useDispatch, useSelector } from "../../app/types/hooks";
import { getEvents } from "../../app/api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
export const EventsCatalog = () => {
  const dispatch = useDispatch();
  const { loading, cards, error } = useSelector((store) => store.events);
  useEffect(() => {
    if (!loading) {
      dispatch(getEvents());
    }
  }, [dispatch]);

  return (
    <div className={style.wrapper}>
      <div className={style.filterBlock}>
        <FilterBlock />
      </div>
      <div className={style.cardsBlock}>
        {/* {.map((event) => (
          <EventCard
            title={event.title}
            description={event.description}
            date={event.date}
            id={event.id}
            img={event.img}
            info={event.info}
            time={event.time}
          />
        ))} */}
        <EventCard
          title='Библиотека решений платформы данныхYandex Cloud'
          description='Рассказали о структуре библиотеки и разобрали два решения.'
          img=''
          date='29 февраля 2024'
          time='12:00'
          info='Есть запись'
          id={1}
        />

        <EventCard
          title='Библиотека решений платформы данныхYandex Cloud'
          description='Рассказали о структуре библиотеки и разобрали два решения.'
          img=''
          date='29 февраля 2024'
          time='12:00'
          id={2}
        />

        <EventCard
          title='Библиотека решений платформы данныхYandex Cloud'
          description='Рассказали о структуре библиотеки и разобрали два решения.'
          img=''
          date='29 февраля 2024'
          time='12:00'
          id={3}
        />
        <EventCard
          title='Библиотека решений платформы данныхYandex Cloud'
          description='Рассказали о структуре библиотеки и разобрали два решения.'
          img=''
          date='29 февраля 2024'
          time='12:00'
          id={4}
        />
        <EventCard
          title='Библиотека решений платформы данныхYandex Cloud'
          description='Рассказали о структуре библиотеки и разобрали два решения.'
          img=''
          date='29 февраля 2024'
          time='12:00'
          info='Есть запись'
          id={5}
        />
        <EventCard
          title='Библиотека решений платформы данныхYandex Cloud'
          description='Рассказали о структуре библиотеки и разобрали два решения.'
          img=''
          date='29 февраля 2024'
          time='12:00'
          id={6}
        />
        <EventCard
          title='Библиотека решений платформы данныхYandex Cloud'
          description='Рассказали о структуре библиотеки и разобрали два решения.'
          img=''
          date='29 февраля 2024'
          time='12:00'
          info='Онлайн'
          id={7}
        />
        <EventCard
          title='Библиотека решений платформы данныхYandex Cloud'
          description='Рассказали о структуре библиотеки и разобрали два решения.'
          img=''
          date='29 февраля 2024'
          time='12:00'
          id={8}
        />
        <EventCard
          title='Библиотека решений платформы данныхYandex Cloud'
          description='Рассказали о структуре библиотеки и разобрали два решения.'
          img=''
          date='29 февраля 2024'
          time='12:00'
          info='Москва'
          id={9}
        />
      </div>
    </div>
  );
};
