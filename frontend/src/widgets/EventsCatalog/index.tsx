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
        <EventCard
          title='Библиотека решений платформы данныхYandex Cloud'
          description='Рассказали о структуре библиотеки и разобрали два решения.'
          img=''
          date='29 февраля 2024'
          time='12:00'
          info='Есть запись'
        />
        <EventCard
          title='Библиотека решений платформы данныхYandex Cloud'
          description='Рассказали о структуре библиотеки и разобрали два решения.'
          img=''
          date='29 февраля 2024'
          time='12:00'
        />
        <EventCard
          title='Библиотека решений платформы данныхYandex Cloud'
          description='Рассказали о структуре библиотеки и разобрали два решения.'
          img=''
          date='29 февраля 2024'
          time='12:00'
        />
        <EventCard
          title='Библиотека решений платформы данныхYandex Cloud'
          description='Рассказали о структуре библиотеки и разобрали два решения.'
          img=''
          date='29 февраля 2024'
          time='12:00'
        />
        <EventCard
          title='Библиотека решений платформы данныхYandex Cloud'
          description='Рассказали о структуре библиотеки и разобрали два решения.'
          img=''
          date='29 февраля 2024'
          time='12:00'
          info='Есть запись'
        />
        <EventCard
          title='Библиотека решений платформы данныхYandex Cloud'
          description='Рассказали о структуре библиотеки и разобрали два решения.'
          img=''
          date='29 февраля 2024'
          time='12:00'
        />
        <EventCard
          title='Библиотека решений платформы данныхYandex Cloud'
          description='Рассказали о структуре библиотеки и разобрали два решения.'
          img=''
          date='29 февраля 2024'
          time='12:00'
          info='Онлайн'
        />
        <EventCard
          title='Библиотека решений платформы данныхYandex Cloud'
          description='Рассказали о структуре библиотеки и разобрали два решения.'
          img=''
          date='29 февраля 2024'
          time='12:00'
        />
        <EventCard
          title='Библиотека решений платформы данныхYandex Cloud'
          description='Рассказали о структуре библиотеки и разобрали два решения.'
          img=''
          date='29 февраля 2024'
          time='12:00'
          info='Москва'
        />
      </div>
    </div>
  );
};
