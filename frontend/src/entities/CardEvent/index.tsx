import React from "react";
import {Link} from "react-router-dom";
import dayjs from 'dayjs';
import {useDispatch, useSelector} from "../../app/types/hooks";
import {handleFavoriteClick} from "../../app/services/slices/favoriteSlice";
import CalendarIcon from "../../app/assets/icons/calendar.svg?react";
import FavoriteIcon from "../../app/assets/icons/favorite.svg?react";
import {ModalRegistration} from "../../widgets/ModalRegistration";
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
    const dispatch = useDispatch();
    const isFavorite = useSelector(state => state.favorite.favorite[String(id)]);
    const finalized = dayjs(`${date} ${time}`).isBefore(dayjs())
    if (finalized) {
      user_application_status = 'finalized';
    }
    if (user_application_status === 'is_favorite') {
      user_application_status = 'not_applied';
    }
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
          {
            {
              not_applied: <ModalRegistration id={id}/>,
              pending: <div className={cn(style.notification, style.pending)}>Ожидает подтверждения</div>,
              approved: <div className={cn(style.notification, style.approved)}>Билет</div>,
              rejected: <div className={cn(style.notification, style.rejected)}>Отклонено</div>,
              finalized: <div className={cn(style.notification, style.finalized)}>Мероприятие завершено</div>,
            }[user_application_status]
          }
        </div>
      </div>
    );
  };
