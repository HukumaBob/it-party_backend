import React, { useReducer, useState } from "react";
import style from "./index.module.scss";
import eventCard from "../../app/assets/image/EventCardImage/Photo.png";
import calendar from "../../app/assets/icons/calendar.svg";
import inactiveFavorite from "../../app/assets/icons/inactiveFavorite.svg";
import favoriteActive from "../../app/assets/icons/favoriteActive.svg";
import { TActionCard, TCard, TStateCard } from "../../app/types/types";
import { PopupRegistration } from "../../entities/PopupRegistration";

const reducer = (state: TStateCard, action: TActionCard) => {
  switch (action.type) {
    case "TOGGLE_ACTIVE":
      return {
        ...state,
        active: action.payload,
      };
    case "SET_OPEN":
      return {
        ...state,
        open: action.payload,
      };
    default:
      return state;
  }
};
export const EventCard = ({
  info,
  title,
  description,
  img,
  date,
  time,
}: TCard) => {
  const [state, dispatch] = useReducer(reducer, {
    active: false,
    open: false,
  });
  const { active, open } = state;

  const handleClick = () => {
    dispatch({ type: "TOGGLE_ACTIVE", payload: !active });
  };

  const handleOpen = () => {
    dispatch({ type: "SET_OPEN", payload: true });
  };

  const handleClose = () => {
    dispatch({ type: "SET_OPEN", payload: false });
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
      <span className={style.title}>{title}</span>
      <span className={style.description}>{description}</span>
      <div className={style.eventTime}>
        <img src={calendar} alt='calendar' />
        <span>{date}</span>
        <span> {time}</span>
      </div>
      <div className={style.buttonContainer}>
        <button className={style.button} onClick={handleOpen}>
          Подать заявку
        </button>
        {open && (
          <div className={style.popup}>
            <PopupRegistration onClose={handleClose} />
          </div>
        )}
      </div>
    </div>
  );
};
