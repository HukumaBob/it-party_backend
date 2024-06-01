import React, { useState } from "react";
import calendar from "../../app/assets/icons/calendar.svg";
import calendarDataPersonal from "../../app/assets/icons/calendar_data_personal.svg";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box } from '@mui/material';
import dayjs, { Dayjs } from "dayjs";
import { useDispatch, useSelector } from "../../app/types/hooks";
import { setChangeDateOfBirth } from "../../app/services/slices/profileSlice";
import { searchDate } from '../../app/services/slices/eventsSlice';
import { getEventsList } from '../../app/api/api';
import style from "./index.module.scss";
import 'dayjs/locale/ru';

const SelectDateDOB = () => {
  const {
    changeDateOfBirth
  } = useSelector((state) => state.profile);
  const dateOfBirth = (changeDateOfBirth !== "" ? changeDateOfBirth : "");
  const dateOfBirthCurrent = (dateOfBirth !== null && dateOfBirth !== "" ? dayjs(`${dateOfBirth}T00:00:00.000`) : null);
  const [value, setValue] = useState<Dayjs | null>(dateOfBirthCurrent);
  const dispatch = useDispatch();
  const century = dayjs('1924-01-01T00:00:00.000');
  const endOf2006 = dayjs('2006-04-30T23:59:59.999');
  const CalendarIcon = () => (
    <img src={calendarDataPersonal} alt="Calendar Data of Birth" />
  );
  const handleChangeDateOfBirth = (value: Dayjs | null) => {
    const valueFormatNew = dayjs(value).format('YYYY-MM-DD');
    dispatch(setChangeDateOfBirth(String(valueFormatNew)));
  };

  return (
    <div className={style.containerDataPicker}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box className={style.boxDataPicker}>
          <DatePicker
            minDate={century}
            maxDate={endOf2006}
            views={['day', 'month', 'year']}
            format='DD.MM.YYYY'
            className={style.dataPicker}
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
              handleChangeDateOfBirth(newValue);
            }}
            slotProps={{ textField: { placeholder: String('_ _._ _._ _ _ _') } }}
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
  );
};

const SelectDateEvent = () => {
  const dispatch = useDispatch();
  const date = useSelector(state => state.events.filters.date_after)
  const CalendarIcon = () => <img src={calendar} alt="Calendar icon" />
  dayjs.locale('ru')

  const handleChange = (value: Dayjs | null) => {
    value && dispatch(searchDate(value.format('YYYY-MM-DD')))
    dispatch(getEventsList())
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
      <DatePicker
        label="Дата"
        value={date ? dayjs(date) : null}
        onChange={handleChange}
        minDate={dayjs()}
        maxDate={dayjs().add(2, 'year')}
        views={['year', 'month', 'day']}
        slots={{ openPickerIcon: CalendarIcon }}
        slotProps={{
          textField: {
            disabled: true,
            inputProps: { value: date ? dayjs(date).format('DD MMMM YYYY') : '' }
          },
        }}
        sx={{
          '.MuiInputBase-root': { paddingRight: '0', border: '1px solid #8dbffb', borderRadius: '8px' },
          '.MuiOutlinedInput-root fieldset': { border: 'none' },
          '.MuiInputLabel-animated': { margin: "-5px 0 0 30px", color: '#1a1b22 !important' },
          '.MuiInputAdornment-root': { order: "-1", },
          '.MuiInputBase-input': {},
          '.MuiInputBase-input.Mui-disabled': {
            width: '130px',
            padding: "10px 0 10px 14px",
            fontSize: "16px",
            WebkitTextFillColor: "unset",
            color: '#1a1b22',
          },
        }}
      />
    </LocalizationProvider>
  )
}

export const SelectDate: React.FC<{ type: "dob" | "events" }> = ({ type }) => {
  switch (type) {
    case 'dob': return <SelectDateDOB />
    case 'events': return <SelectDateEvent />
    default: throw Error('В SelectDate передан неизветсный type')
  };
};