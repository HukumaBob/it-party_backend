import React, { useState } from "react";
import style from "./index.module.scss";
import calendar from "../../app/assets/icons/calendar.svg";
import calendarDataPersonal from "../../app/assets/icons/calendar_data_personal.svg";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box } from '@mui/material';
import dayjs, { Dayjs } from "dayjs";
import { TSelectData } from "../../app/types/types";
import { useDispatch, useSelector } from "../../app/types/hooks";
import {
  setChangeDateOfBirth,
} from "../../app/services/slices/formSlice";

export const SelectDate = ({ id }: TSelectData) => {
  
  const [click, setClick] = useState<boolean>(false);
  const [value, setValue] = React.useState<Dayjs | null >(null);
  const dispatch = useDispatch();
  const today = dayjs('0000-00-00T00:00:00.000');
  const title: string = "Выбор даты";
  const century = dayjs('1924-01-01T00:00:00.000');
  const endOf2006 = dayjs('2006-04-30T23:59:59.999');
  const CalendarIcon = () => (
    <img src={calendarDataPersonal} alt="Calendar Data of Birth" />
  );
  const handleOpen = () => {
    setClick(!click);
  };
  const handleChangeDateOfBirth = (value: Dayjs | null ) => {
    console.log(value);
    dispatch(setChangeDateOfBirth(String(value)));
  };

  return (
    (Number(id) === 1) ? (
      <div className={style.container} onClick={handleOpen}>
        <span className={style.selectDate} >
          <img src={ calendar } alt='calendar' /> {title}
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
    ) : (
      <div className={style.containerDataPicker}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box className={style.boxDataPicker}>
            <DatePicker
              defaultValue={today}
              minDate={century}
              maxDate={endOf2006}
              views={['year', 'month', 'day']}
              format='DD.MM.YYYY'
              className={style.dataPicker}
              value={value}
              onChange={(newValue) => {
                console.log(newValue);
                setValue(newValue); 
                handleChangeDateOfBirth(newValue);
              }}
              slotProps={{ textField: { placeholder: '_ _._ _._ _ _ _' } }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#8dbffb',
                    borderRadius: '12px',
                  },
                  '&:hover fieldset': {
                    borderColor: 'green',
                  },
                },
              }}
              slots={{ openPickerIcon: CalendarIcon }}
            /> 
          </Box>
        </LocalizationProvider>
      </div>
    )
  );
};
