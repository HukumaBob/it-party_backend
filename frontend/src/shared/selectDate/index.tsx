import {useState} from "react";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {ReactComponent as CalendarIcon} from "../../app/assets/icons/calendar_date.svg";
import dayjs, {Dayjs} from "dayjs";
import {useDispatch, useSelector} from "../../app/types/hooks";
import {setChangeDateOfBirth} from "../../app/services/slices/profileSlice";

export const SelectDate = () => {
  const {changeDateOfBirth} = useSelector((state) => state.profile);
  const dateOfBirth = (changeDateOfBirth !== "" ? changeDateOfBirth : "");
  const dateOfBirthCurrent = (dateOfBirth !== null && dateOfBirth !== "" ? dayjs(`${dateOfBirth}T00:00:00.000`) : null);
  const [value, setValue] = useState<Dayjs | null>(dateOfBirthCurrent);
  const dispatch = useDispatch();
  const handleChangeDateOfBirth = (value: Dayjs | null) => {
    const valueFormatNew = dayjs(value).format('YYYY-MM-DD');
    dispatch(setChangeDateOfBirth(String(valueFormatNew)));
  };
  const today = dayjs();
  const minDate = today.subtract(100, 'year');
  const maxDate = today.subtract(10, 'year');

  return (
    <DatePicker
      minDate={minDate}
      maxDate={maxDate}
      views={['day', 'month', 'year']}
      format='DD.MM.YYYY'
      value={value}
      onChange={(newValue) => {
        setValue(newValue);
        handleChangeDateOfBirth(newValue);
      }}
      slotProps={{textField: {placeholder: String('_ _._ _._ _ _ _')}}}
      sx={{
        '.MuiOutlinedInput-root fieldset': {
          borderColor: 'var(--c-str-medium)',
          borderRadius: '12px',
        },
      }}
      slots={{openPickerIcon: () => <CalendarIcon/>}}
    />
  );
};


