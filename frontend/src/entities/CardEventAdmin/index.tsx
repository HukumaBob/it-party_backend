import React from "react";
import {Link} from "react-router-dom";
import dayjs from 'dayjs';
import CalendarIcon from "../../app/assets/icons/calendar.svg?react";
import style from "./index.module.scss";

type TApplicationCounts = {
  approved: number;
  pending: number;
  rejected: number;
}

type TProps = {
  id: number;
  name: string;
  logo: string;
  date: string;
  time: string;
  application_status_counts: TApplicationCounts;
}

export const CardEventAdmin: React.FC<TProps> =
  ({
     id,
     name,
     logo,
     date,
     time,
     application_status_counts: {pending, approved}
   }) => {
    const getPluralForm = (number: number, nominativeSingular: string, nominativePlural: string, genitivePlural: string) => {
      if (number % 10 === 1 && number % 100 !== 11) {
        return `${number} ${nominativeSingular}`;
      } else if (2 <= number % 10 && number % 10 <= 4 && (number % 100 < 10 || number % 100 >= 20)) {
        return `${number} ${nominativePlural}`;
      } else {
        return `${number} ${genitivePlural}`;
      }
    }
    const linkText = pending
      ? '+' + getPluralForm(pending, "новая заявка", "новые заявки", "новых заявок")
      : getPluralForm(approved, "участник", "участника", "участников");

    return (
      <div className={style.container}>
        <Link className={style.linkApplications} to={`/admin/applicants/${id}`}>{linkText}</Link>
        <img className={style.image} src={logo} alt='event'/>
        <div className={style.wrapper}>
          <Link className={style.linkEvent} to={`/event/${id}`}>{name}</Link>
          <time className={style.time} dateTime={date}>
            <CalendarIcon/>
            {dayjs(date).format('D MMMM YYYY')}
            <span>{time.replace(/:\d{2}$/, '')}</span>
          </time>
          <Link className={style.linkEdit} to={`/admin/event/${id}`}>Редактировать</Link>
          <button className={style.buttonArchive}>В архив</button>
        </div>
      </div>
    );
  };
