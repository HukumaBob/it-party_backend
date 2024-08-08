import React, {useState} from 'react';
import {Popover} from "@mui/material";
import dayjs, {Dayjs} from "dayjs";
import {DateCalendar} from "@mui/x-date-pickers";
import {useAppDispatch, useAppSelector} from '../../app/services/hooks.ts';
import {setDateBeforeFilter, setDateAfterFilter} from "../../app/services/slices/eventListSlice";
import CalendarIcon from "../../app/assets/icons/calendar.svg?react";
import ArrowIcon from "../../app/assets/icons/arrow_right.svg?react";
import cn from 'classnames';
import style from "./index.module.scss";


export const FilterDate = () => {
  const dispatch = useAppDispatch();
  const {date_after, date_before} = useAppSelector(state => state.eventList.filters)
  const default_date_after = useAppSelector(state => state.eventList.default_date_after)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [type, setType] = useState<string>('date_after')

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectBeforeAfter = (type: string) => {
    setType(type)
  }

  const handleChange = (value: Dayjs | null) => {
    if (value) {
      if (type === 'date_before') {
        dispatch(setDateBeforeFilter(value.format('YYYY-MM-DD')));
      } else {
        dispatch(setDateAfterFilter(value.format('YYYY-MM-DD')));
      }
    }
  };

  const formatDate = (date: string | null) => {
    return date && dayjs(date).format('D MMMM YYYY');
  };

  const getCalendarValue = () => (
    type === 'date_before' ?
      date_before && dayjs(date_before) || null :
      date_after && dayjs(date_after) || null
  )

  const getMinDate = () => {
    if (type === 'date_before' && date_after) {
      return dayjs(date_after).add(1, 'day');
    }
    return dayjs('2020-01-01');
  };

  const getMaxDate = () => {
    if (type === 'date_after' && date_before) {
      return dayjs(date_before).subtract(1, 'day');
    }
    return dayjs().add(2, 'year');
  };

  return (
    <div>
      <button
        className={cn(style.menuButton, {[style.active]: date_before || date_after})}
        onClick={handleOpen}
      >
        <CalendarIcon/> Дата
      </button>

      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
        transformOrigin={{vertical: 'top', horizontal: 'left'}}
        transitionDuration={0}
        sx={{
          marginTop: '3px',
          '.MuiPaper-root': {
            borderRadius: '8px',
            outline: '1px solid var(--c-str-medium)',
            boxShadow: '-6px 6px 10px 0 #00000044',
          }
        }}>
        <div className={style.menuContainer}>
          <div className={style.buttonsContainer}>
            <button
              className={cn(style.dateButton, {[style.active]: type === 'date_after', [style.default]: !date_after})}
              onClick={() => handleSelectBeforeAfter('date_after')}
            >
              <CalendarIcon/>
              {date_after ? formatDate(date_after) : default_date_after}
            </button>
            <ArrowIcon/>
            <button
              className={cn(style.dateButton, {[style.active]: type === 'date_before'})}
              onClick={() => handleSelectBeforeAfter('date_before')}
            >
              <CalendarIcon/>
              {formatDate(date_before)}
            </button>
          </div>

          <DateCalendar
            value={getCalendarValue()}
            onChange={handleChange}
            minDate={getMinDate()}
            maxDate={getMaxDate()}
            views={['year', 'month', 'day']}
          />
        </div>
      </Popover>

    </div>
  );
};
