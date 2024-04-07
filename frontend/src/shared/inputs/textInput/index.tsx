import React, { useState } from "react";
import style from "./index.module.scss";
import { TTextInput } from "../../../app/types/types";
export const TextInput = ({
  title,
  placeholder,
  type,
  isValid,
}: TTextInput) => {
  const [value, setValue] = useState<string>("");
  const onChange = (e: any) => setValue(e.target.value);
  if (value === "") {
    isValid = false;
  }
  return (
    <form action='' className={style.name_form}>
      <label htmlFor='nameInput'>
        {title} <span>*</span>
      </label>
      <input
        type={type}
        id='nameInput'
        name='name'
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
      <span className={isValid ? style.message : style.error}>
        Необходимо для регистрации на мероприятие
      </span>
    </form>
  );
};
