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
import { useDispatch } from "../../app/types/hooks";
import {
  setChangeDateOfBirth,
} from "../../app/services/slices/formSlice";

export const SelectDate = ({ id }: TSelectData) => {
  const profileStorage = localStorage.getItem("updateInfo");
  const profileData = profileStorage ? JSON.parse(profileStorage) : {};
  const dateOfBirth = (profileData.date_of_birth !== "" ? profileData.date_of_birth : "");
  const [click, setClick] = useState<boolean>(false);
  const [value, setValue] = React.useState<Dayjs | null >(null);
  const dispatch = useDispatch();
  const defaultDay = dayjs('0000-00-00T00:00:00.000');
  const dateOfBirthCurrent = dayjs(`${dateOfBirth !== "" ? dateOfBirth : ""}T00:00:00.000`);
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
    const valueFormatNew = dayjs(value).format('YYYY-MM-DD');
    dispatch(setChangeDateOfBirth(String(valueFormatNew)));
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
              defaultValue={dateOfBirth !== "" ? dateOfBirthCurrent : defaultDay}
              minDate={century}
              maxDate={endOf2006}
              views={['year', 'month', 'day']}
              format='DD.MM.YYYY'
              className={style.dataPicker}
              value={value}
              onChange={(newValue) => {
                setValue(newValue); 
                handleChangeDateOfBirth(newValue);
              }}
              slotProps={{ textField: { placeholder: dateOfBirth !== "" ? dateOfBirth : '_ _._ _._ _ _ _'} }}
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
