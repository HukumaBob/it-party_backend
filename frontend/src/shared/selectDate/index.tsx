import React, { useState } from "react";
import style from "./index.module.scss";
import calendar from "../../app/assets/icons/calendar.svg";
import calendarDataPersonal from "../../app/assets/icons/calendar_data_personal.svg";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs, { Dayjs } from "dayjs";
import { TSelectData } from "../../app/types/types";

export const SelectDate = ({ id }: TSelectData) => {
  const [click, setClick] = useState<boolean>(false);
  const [value, setValue] = React.useState<Dayjs | null>(dayjs());
  const title: string = "Выбор даты"
  const handleOpen = () => {
    setClick(!click);
  };

  return (
    <div className={style.container} onClick={handleOpen}>
      <span className={style.selectDate} >
        <img src={(id === '1') ? calendar : calendarDataPersonal} alt='calendar' /> {(id === '1') ? "Выбор даты" : ""}
        <div className={style.calendarBlock}>
          {click && (id === '1') && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                value={value}
                onChange={(newValue) => setValue(newValue)}
                className={style.customCalendar}
              />
            </LocalizationProvider>
          )}
          {click && (id === '2') && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                value={value}
                onChange={(newValue) => {setValue(newValue); localStorage.setItem('date_of_birth', newValue);}}
                className={style.customCalendar}
              />
            </LocalizationProvider>
          )}
        </div>
      </span>
    </div>
  );
};
