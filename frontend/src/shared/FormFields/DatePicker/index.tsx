import React from "react";
import {Dayjs} from "dayjs";
import {DatePicker as MuiDatePicker} from '@mui/x-date-pickers/DatePicker';
import CalendarIcon from "../../../app/assets/icons/calendar_date.svg?react";
import {Controller} from 'react-hook-form';

type TProps = {
  name: string;
  control: any;
  rules: any;
  minDate?: Dayjs;
  maxDate?: Dayjs;
}

export const DatePicker: React.FC<TProps> = ({name, control, rules, minDate = null, maxDate = null}) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({field, fieldState: {error}}) => (
      <MuiDatePicker
        {...field}
        value={field.value || null}
        minDate={minDate}
        maxDate={maxDate}
        views={['day', 'month', 'year']}
        format='DD.MM.YYYY'
        slotProps={{textField: {placeholder: '_ _._ _._ _ _ _'}}}
        sx={{
          width: '100%',
          '.MuiInputBase-root': {
            border: '1px solid var(--c-str-medium)',
            borderColor: error ? 'var(--c-er-red)' : 'var(--c-str-medium)',
            borderRadius: '8px',
            '&.Mui-focused': {
              outline: '1px solid var(--c-str-medium)',
            },
          },
          input: {padding: '13px'},
          '.MuiFormLabel-root': {display: 'none'},
          '.MuiOutlinedInput-notchedOutline': {display: 'none'},
        }}
        slots={{openPickerIcon: () => <CalendarIcon/>}}
      />
    )}
  />
);
