import React from 'react';
import {Controller} from 'react-hook-form';
import ReactSelect, {StylesConfig, components} from 'react-select';
import {ReactComponent as ArrowIcon} from "../../../app/assets/icons/arrow_down.svg";

type TOption = {
  value: string | number;
  label: string;
}

type TProps = {
  options: TOption[];
  name: string;
  control: any;
  placeholder?: string;
  rules?: any;
}

const customStyles: (hasError: boolean) => StylesConfig<TOption, false> = (isError) => ({
  control: (provided, state) => ({
    ...provided,
    borderRadius: '12px',
    height: '49px',
    boxShadow: 'none',
    borderColor: isError ? 'var(--c-er-red)' : (state.isFocused ? 'var(--c-str-medium)' : 'var(--c-str-medium)'),
    '&:hover': {
      borderColor: isError ? 'var(--c-er-red)' : (state.isFocused ? 'var(--c-str-medium)' : 'var(--c-str-medium)'),
    },
  }),
  indicatorSeparator: () => ({display: 'none'}),
  menu: (provided, state) => ({
    ...provided,
    marginTop: '3px',
    borderRadius: '6px',
    border: '1px solid var(--c-str-medium)',
    boxShadow: 'none',
  }),
  option: (provided, state) => ({
    ...provided,
    color: 'var(--c-def-black)',
    backgroundColor: state.isSelected ? 'var(--c-str-medium)' : 'white',
    '&:hover': {
      backgroundColor: 'var(--c-black-100)',
    },
  }),
  placeholder: (provided, state) => ({
    ...provided,
    fontFamily: 'YS-Text',
    color: 'var(--c-black-500)',
    fontSize: '14px',
  }),
});

const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <ArrowIcon/>
    </components.DropdownIndicator>
  );
};

export const Select: React.FC<TProps> = ({options, name, control, placeholder, rules}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({field, fieldState: {error}}) => (
        <ReactSelect
          {...field}
          options={options}
          styles={customStyles(Boolean(error))}
          placeholder={placeholder}
          components={{DropdownIndicator}}
          onChange={(selectedOption) => field.onChange(selectedOption)}
        />
      )}
    />
  );
};
