import React from "react";
import {Link} from "react-router-dom";
import dayjs from 'dayjs';
import {useAppDispatch, useAppSelector} from "../../app/services/hooks.ts";
import {handleFavoriteClick} from "../../app/services/slices/favoriteSlice";
import CalendarIcon from "../../app/assets/icons/calendar.svg?react";
import FavoriteIcon from "../../app/assets/icons/favorite.svg?react";
import {ModalEventRegistration} from "../../widgets/ModalEventRegistration";
import cn from 'classnames'
import style from "./index.module.scss";

type TCardEvent = {
  id: number;
  name: string;
  description: string;
  logo: string;
  date: string;
  time: string;
  user_application_status: 'not_applied' | 'pending' | 'approved' | 'rejected' | 'finalized' | 'is_favorite'
}

export const CardEvent: React.FC<TCardEvent> =
  ({
     id,
     name,
     description,
     logo,
     date,
     time,
     user_application_status
   }) => {
    const dispatch = useAppDispatch();
    const isFavorite = useAppSelector(state => state.favorite.favorite[String(id)]);
    const handleClick = () => {
      dispatch(handleFavoriteClick(id))
    }

    return (
      <div className={style.container}>

        <button
          onClick={handleClick}
          className={cn(style.favoriteButton, {[style.favorite]: isFavorite})}
        >
          <FavoriteIcon/>
        </button>

        <Link className={style.link} to={`/event/${id}`}>
          <div className={style.imageContainer}>
            <img src={logo} alt='event'/>
            <div className={style.background}></div>
          </div>

          <div className={style.content}>
            <h2>{name}</h2>
            <p>{description}</p>
            <time dateTime={date}>
              <CalendarIcon/>
              {dayjs(date).format('D MMMM YYYY')}
              <span>{time.replace(/:\d{2}$/, '')}</span>
            </time>
          </div>
        </Link>

        <div className={style.registrationContainer}>
          <ModalEventRegistration id={id} name={name} status={user_application_status} date={date} time={time}/>
        </div>
      </div>
    );
  };
