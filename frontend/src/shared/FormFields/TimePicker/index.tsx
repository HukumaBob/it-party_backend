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
      render={({field}) => (
        <MuiTimePicker
          {...field}
          format="hh : mm"
          views={['hours', 'minutes']}
          slots={{openPickerIcon: () => <TimeIcon/>}}
          sx={{
            width: '100%',
            border: '1px solid var(--c-str-medium)',
            borderRadius: '12px',
            input: {padding: '13px'},
            '.MuiFormLabel-root': {display: 'none'},
            '.MuiOutlinedInput-notchedOutline ': {display: 'none'},
          }}
        />
      )}
    />
  );
};
