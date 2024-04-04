import React from "react";
import style from "./index.module.scss";
import calendar from "../../app/assets/icons/calendar.svg";
export const SelectDate = () => {
  return (
    <div className={style.container}>
      <span className={style.selectDate}>
        <img src={calendar} alt='calendar' /> Выбор даты
      </span>
    </div>
  );
};
