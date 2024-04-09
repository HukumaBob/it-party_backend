import React, { useState } from "react";
import style from "./index.module.scss";
import eventCard from "../../app/assets/image/EventCardImage/Photo.png";
import calendar from "../../app/assets/icons/calendar.svg";
import inactiveFavorite from "../../app/assets/icons/inactiveFavorite.svg";
import favoriteActive from "../../app/assets/icons/favoriteActive.svg";
import { TCard } from "../../app/types/types";
import { Link } from "react-router-dom";
import { RegistrationButton } from "../../features/RegistrationButton";

export const EventCard = ({
  info,
  title,
  description,
  img,
  date,
  time,
  id,
}: TCard) => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.imageBlock}>
        <span className={`${info ? style.info : style.none}`}>{info}</span>
        <div className={style.favoriteBackground} onClick={handleClick}>
          {active ? (
            <img
              src={favoriteActive}
              alt='favorite'
              className={style.favorite}
              onClick={handleClick}
            />
          ) : (
            <img
              src={inactiveFavorite}
              alt='favorite'
              className={style.favorite}
            />
          )}
        </div>
        <img src={eventCard} alt='eventImage' className={style.image} />
        <span className={style.background}></span>
      </div>
      <Link to={`/event/${id}`}>
        <span className={style.title}>{title}</span>
        <span className={style.description}>{description}</span>
        <div className={style.eventTime}>
          <img src={calendar} alt='calendar' />
          <span>{date}</span>
          <span> {time}</span>
        </div>
      </Link>

      <div className={style.buttonContainer}>
        <div className={style.button}>
          <RegistrationButton />
        </div>
      </div>
    </div>
  );
};
