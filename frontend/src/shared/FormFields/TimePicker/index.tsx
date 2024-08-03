import React from "react";
import {TimePicker as MuiTimePicker} from "@mui/x-date-pickers";
import {Controller} from 'react-hook-form';
import TimeIcon from "../../../app/assets/icons/time.svg?react"

type TProps = {
  name: string;
  control: any;
  rules: any;
}

export const TimePicker: React.FC<TProps> = ({name, control, rules}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({field, fieldState: {error}}) => (
        <MuiTimePicker
          {...field}
          format="hh : mm"
          views={['hours', 'minutes']}
          slots={{openPickerIcon: () => <TimeIcon/>}}
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
        />
      )}
    />
  );
};
