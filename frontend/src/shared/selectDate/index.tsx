import React, { useState } from "react";
import style from "./index.module.scss";
import calendar from "../../app/assets/icons/calendar.svg";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs, { Dayjs } from "dayjs";
export const SelectDate = () => {
  const [click, setClick] = useState<boolean>(false);
  const [value, setValue] = React.useState<Dayjs | null>(dayjs());
  const handleOpen = () => {
    setClick(!click);
  };

  return (
    <div className={style.container} onClick={handleOpen}>
      <span className={style.selectDate} >
        <img src={calendar} alt='calendar' /> Выбор даты
        <div className={style.calendarBlock}>
          {click && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                value={value}
                onChange={(newValue) => setValue(newValue)}
                className={style.customCalendar}
              />
            </LocalizationProvider>
          )}
        </div>
      </span>
    </div>
  );
};
