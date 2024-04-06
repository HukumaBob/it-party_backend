import React, { useState } from "react";
import style from "./index.module.scss";
import arrow_down from "../../../app/assets/icons/arrow_down.svg";
import { TSelectInput } from "../../../app/types/types";
import { CheckBox } from "../../checkbox";

export const SelectInput = ({ title }: TSelectInput) => {
  const [click, setClick] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>("Не выбран");

  const handleClick = () => {
    setClick(!click);
  };

  const handleOptionClick = (value: string) => {
    setSelectedValue(value);
    setClick(false);
  };

  return (
    <div className={style.container}>
      <label htmlFor='nameInput'>
        {title} <span className={style.star}>*</span>
      </label>
      <div className={style.customSelect} onClick={handleClick}>
        <span>{selectedValue}</span>
        <img src={arrow_down} alt='arrow' />
      </div>
      <span className={style.required}>
        Необходимо для регистрации на мероприятие
      </span>
      {click && (
        <div className={style.options}>
          <div
            className={style.option}
            onClick={() => handleOptionClick("Значение 1")}>
            Значение 1
          </div>
          <div
            className={style.option}
            onClick={() => handleOptionClick("Значение 2")}>
            Значение 2
          </div>
          <div
            className={style.option}
            onClick={() => handleOptionClick("Значение 3")}>
            Значение 3
          </div>
        </div>
      )}
      {selectedValue === "Значение 2" && (
        <div className={style.technology}>
          <label htmlFor='nameInput'>Ваш стек</label>
          <div className={style.element}>
            <CheckBox /> <span>JavaScript</span>
          </div>
          <div className={style.element}>
            <CheckBox /> <span>React</span>
          </div>
          <div className={style.element}>
            <CheckBox /> <span>TypeScript</span>
          </div>
        </div>
      )}
    </div>
  );
};
