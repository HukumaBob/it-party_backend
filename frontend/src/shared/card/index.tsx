import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
import eventCard from "../../app/assets/image/EventCardImage/Photo.png";
import calendar from "../../app/assets/icons/calendar.svg";
import inactiveFavorite from "../../app/assets/icons/inactiveFavorite.svg";
import favoriteActive from "../../app/assets/icons/favoriteActive.svg";
import { TCard } from "../../app/types/types";
import { Link } from "react-router-dom";
import { RegistrationButton } from "../../features/RegistrationButton";
import { useDispatch, useSelector } from "../../app/types/hooks";
import {
  addToArchive,
  deleteItem,
} from "../../app/services/slices/adminPageSlice";
import close_mini from "../../app/assets/icons/close_mini_white.svg";
import {
  addToFavourite,
  deleteFavourite,
  setActive,
} from "../../app/services/slices/myEventsSlice";
export const EventCard = ({
  info,
  title,
  description,
  img,
  date,
  time,
  id,
  admin,
  myEventBoolean,
}: TCard) => {
  const { archive, activeTab } = useSelector((store) => store.admin);
  const { active, myEvent } = useSelector((store) => store.myEvents);

  const pending = myEvent.some(
    (event) => event.id === id && event.user_application_status === "pending",
  );
  const approved = myEvent.some(
    (event) => event.id === id && event.user_application_status === "approved",
  );
  const reject = myEvent.some(
    (event) => event.id === id && event.user_application_status === "rejected",
  );
  console.log(pending);

  const dispatch = useDispatch();
  const handleAddToArchive = () => {
    const existingItem = archive.find((item) => item.id === id);
    if (!existingItem) {
      dispatch(
        addToArchive({ info, title, description, img, date, time, id, admin }),
      );
    }
  };

  const handleAddToFavourite = () => {
    dispatch(setActive({ id: id, value: true }));
    const existingItem = archive.find((item) => item.id === id);
    if (!existingItem) {
      dispatch(
        addToFavourite({
          info,
          title,
          description,
          img,
          date,
          time,
          id,
        }),
      );
    }
  };
  const handleDelete = () => {
    dispatch(deleteItem(id));
  };
  const handleDeleteEvents = () => {
    dispatch(deleteFavourite(id));
    dispatch(setActive({ id: id, value: false }));
  };

  return (
    <div className={style.wrapper}>
      <div className={style.imageBlock}>
        {admin && activeTab === "Архив" ? (
          <div className={style.favoriteBackground} onClick={handleDelete}>
            <img src={close_mini} alt='closeIcon' className={style.favorite} />
          </div>
        ) : (
          <>
            <div className={style.favoriteBackground}>
              {active[id] ? (
                <img
                  src={favoriteActive}
                  alt='favorite'
                  className={style.favorite}
                  onClick={handleDeleteEvents}
                />
              ) : (
                <img
                  src={inactiveFavorite}
                  alt='favorite'
                  className={style.favorite}
                  onClick={handleAddToFavourite}
                />
              )}
            </div>
            {admin ? (
              <span className={`${info ? style.info : style.none}`}>
                <Link to='/newApplication'>{info}</Link>
              </span>
            ) : (
              <span className={`${info ? style.info : style.none}`}>
                {info}
              </span>
            )}
          </>
        )}

        <img src={img} alt='eventImage' className={style.image} />
        <span className={style.background}></span>
      </div>
      <Link to={`/event/${id}`}>
        <span className={style.title}>{title}</span>
        {admin ? "" : <span className={style.description}>{description}</span>}
        <div className={style.eventTime}>
          <img src={calendar} alt='calendar' />
          <span>{date}</span>
          <span> {time}</span>
        </div>
      </Link>

      <div className={style.buttonContainer}>
        <div className={style.button}>
          {admin ? (
            <div className={style.buttonBlock}>
              <button className={style.adminButton}>Редактировать</button>
              <button
                className={style.adminButtonArchive}
                onClick={handleAddToArchive}>
                В архив
              </button>
            </div>
          ) : myEventBoolean && pending ? (
            <div className={style.pending}>
              <button>Ожидает подтверждения</button>
            </div>
          ) : myEventBoolean && approved ? (
            <div className={style.approved}>
              <button>Билет</button>
            </div>
          ) : myEventBoolean && reject ? (
            <div className={style.reject}>
              <button>Отклонено</button>
            </div>
          ) : (
            <RegistrationButton id={id} />
          )}
        </div>
      </div>
    </div>
  );
};
