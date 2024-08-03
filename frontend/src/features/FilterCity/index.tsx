import {useMemo} from "react";
import Select, {StylesConfig, components, DropdownIndicatorProps, SingleValue} from 'react-select';
import ArrowIcon from '../../app/assets/icons/arrow_down.svg?react';
import {useDispatch, useSelector} from "../../app/types/hooks";
import {setCityFilter} from "../../app/services/slices/eventListSlice";

type TOption = {
  value: number;
  label: string;
}

const customStyles: StylesConfig<TOption, false> = {
  container: (provided) => ({
    ...provided,
    '@media (max-width: 575.98px)': {
      gridColumn: '1 / -1',
      order: 1
    },
  }),
  control: (provided, state) => ({
    ...provided,
    width: '100%',
    height: '100%',
    boxShadow: 'none',
    borderRadius: '8px',
    borderColor: state.isFocused ? 'var(--c-str-medium)' : 'var(--c-str-medium)',
    '&:hover': {
      borderColor: state.isFocused ? 'var(--c-str-medium)' : 'var(--c-str-medium)',
    },
  }),
  indicatorSeparator: () => ({display: 'none'}),
  menu: (provided) => ({
    ...provided,
    marginTop: '3px',
    borderRadius: '6px',
    border: '1px solid var(--c-str-medium)',
    boxShadow: 'none',
    zIndex: '10',
  }),
  option: (provided, state) => ({
    ...provided,
    color: 'var(--c-def-black)',
    backgroundColor: state.isSelected ? 'var(--c-str-medium)' : 'white',
    '&:hover': {
      backgroundColor: 'var(--c-black-100)',
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'var(--c-black-500)',
  }),
};

const DropdownIndicator = (props: DropdownIndicatorProps<TOption, false>) => {
  const {selectProps} = props;
  const color = selectProps.value ? 'var(--c-def-black)' : 'var(--c-def-500)';

  return (
    <components.DropdownIndicator {...props}>
      <ArrowIcon style={{color: color}}/>
    </components.DropdownIndicator>
  );
};

export const FilterCity = () => {
  const dispatch = useDispatch()
  const cityList = useSelector(state => state.city.data)
  const {city} = useSelector(state => state.eventList.filters)

  const options = useMemo(() => (
    cityList && cityList.map(({id, name}) => ({value: id, label: name}))
  ), [cityList])

  const handleChange = (option: SingleValue<{ value: number, label: string }>) => {
    option !== null && dispatch(setCityFilter(option));
  };

  return (
    <Select
      value={city}
      placeholder={'Город'}
      onChange={handleChange}
      options={options || undefined}
      styles={customStyles}
      components={{DropdownIndicator}}
    />
  );
};
