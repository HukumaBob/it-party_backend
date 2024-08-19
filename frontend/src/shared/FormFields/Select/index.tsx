import React from 'react';
import {Controller} from 'react-hook-form';
import ReactSelect, {StylesConfig, components} from 'react-select';
import ArrowIcon from "../../../app/assets/icons/arrow_down.svg?react";

type TOption = {
  value: string | number;
  label: string;
};
type TProps = {
  options: TOption[];
  name: string;
  control: any;
  placeholder?: string;
  rules?: any;
  multiple?: boolean;
};

const customStyles: (hasError: boolean) => StylesConfig<TOption, boolean> = (isError) => ({
  control: (provided, state) => ({
    ...provided,
    borderRadius: '8px',
    height: '49px',
    borderColor: isError ? 'var(--c-er-red)' : (state.isFocused ? 'var(--c-str-medium)' : 'var(--c-str-medium)'),
    outline: state.isFocused ? '1px solid var(--c-str-medium)' : 'none',
    '&:hover': {
      borderColor: isError ? 'var(--c-er-red)' : (state.isFocused ? 'var(--c-str-medium)' : 'var(--c-str-medium)'),
    },
  }),
  indicatorSeparator: () => ({display: 'none'}),
  dropdownIndicator: (provided) => ({
    ...provided,
    transition: 'none',
    '&:hover': {
      color: provided.color,
    },
  }),
  menu: (provided) => ({
    ...provided,
    marginTop: '2px',
    borderRadius: '8px',
    border: '1px solid var(--c-str-medium)',
    boxShadow: '0px 11px 10px 0 #1a1b2240',
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
    fontFamily: 'YS-Text, sans-serif',
    color: 'var(--c-black-300)',
    fontSize: '14px',
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: 'var(--c-str-light)',
    borderRadius: '4px',
    padding: '4px 2px',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: 'var(--c-def-black)',
    fontFamily: 'YS-Text',
    fontSize: '16px',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: 'var(--c-def-black)',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '3px',
    '&:hover': {
      backgroundColor: 'var(--c-er-red)',
      color: 'var(--c-def-white)',
    },
  }),
});

const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <ArrowIcon/>
    </components.DropdownIndicator>
  );
};

export const Select: React.FC<TProps> = ({options, name, control, placeholder, rules, multiple = false}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({field, fieldState: {error}}) => (
        <ReactSelect
          {...field}
          options={options}
          isMulti={multiple}
          styles={customStyles(Boolean(error))}
          placeholder={placeholder}
          components={{DropdownIndicator}}
          onChange={(selectedOption) => field.onChange(selectedOption)}
        />
      )}
    />
  );
};
