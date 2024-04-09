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
