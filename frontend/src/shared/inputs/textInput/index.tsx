import React from "react";
import style from "./index.module.scss";
import { TTextInput } from "../../../app/types/types";
export const TextInput = ({ title, placeholder, type }: TTextInput) => {
  return (
    <form action='' className={style.name_form}>
      <label htmlFor='nameInput'>
        {title} <span>*</span>
      </label>
      <input
        type={type}
        id='nameInput'
        name='name'
        placeholder={placeholder}
        required
      />
      <span>Необходимо для регистрации на мероприятие</span>
    </form>
  );
};
