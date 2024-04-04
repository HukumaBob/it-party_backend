import React from "react";
import style from "./index.module.scss";
import eventCard from "../../app/assets/image/EventCardImage/Developers.webp";
import calendar from "../../app/assets/icons/calendar.svg";
import inactiveFavorite from "../../app/assets/icons/inactiveFavorite.svg";
export const EventCard = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.imageBlock}>
        <span className={style.info}>Москва</span>
        <div className={style.favoriteBackground}>
          <img
            src={inactiveFavorite}
            alt='favorite'
            className={style.favorite}
          />
        </div>
        <img src={eventCard} alt='eventImage' className={style.image} />
        <span className={style.background}></span>
      </div>
      <span className={style.title}>
        Библиотека решений платформы данныхYandex Cloud
      </span>
      <span className={style.description}>
        Рассказали о структуре библиотеки и разобрали два решения.
      </span>
      <div className={style.eventTime}>
        <img src={calendar} alt='calendar' />
        <span>29 февраля 2024</span>
        <span> 12:00</span>
      </div>
      <div className={style.buttonContainer}>
        <button className={style.button}>Подать заявку</button>
      </div>
    </div>
  );
};
