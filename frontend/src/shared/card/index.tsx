import React from "react";
import style from "./index.module.scss";
import eventCard from "../../app/assets/image/EventCardImage/Developers.webp";
import calendar from "../../app/assets/icons/calendar.svg";
import inactiveFavorite from "../../app/assets/icons/inactiveFavorite.svg";
import { TCard } from "../../app/types/types";
export const EventCard = ({
  info,
  title,
  description,
  img,
  date,
  time,
}: TCard) => {
    
  return (
    <div className={style.wrapper}>
      <div className={style.imageBlock}>
        <span className={`${info ? style.info : style.none}`}>{info}</span>
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
      <span className={style.title}>{title}</span>
      <span className={style.description}>{description}</span>
      <div className={style.eventTime}>
        <img src={calendar} alt='calendar' />
        <span>{date}</span>
        <span> {time}</span>
      </div>
      <div className={style.buttonContainer}>
        <button className={style.button}>Подать заявку</button>
      </div>
    </div>
  );
};
