import React, { useState } from "react";
import style from "./index.module.scss";
import arrow_down from "../../../app/assets/icons/arrow_down.svg";
import { TSelectInput } from "../../../app/types/types";
import { CheckBox } from "../../checkbox";
import { UseFormRegister } from "react-hook-form";

interface SelectInputProps extends TSelectInput {
  register: UseFormRegister<any>;
}

export const SelectInput = ({ title, register }: SelectInputProps) => {
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
        Необходимо для регистрации на мероприятие
      </span>
      {click && (
        <div className={style.options}>
          <div
            className={style.option}
            onClick={() =>
              handleOptionClick(
                `${title === "Ваш опыт работы" ? "До 1 года" : "Backend"}`,
              )
            }>
            {title === "Ваш опыт работы" ? "До 1 года" : "Backend"}
          </div>
          <div
            className={style.option}
            onClick={() =>
              handleOptionClick(
                `${title === "Ваш опыт работы" ? "1 год и более" : "Frontend"}`,
              )
            }>
            {title === "Ваш опыт работы" ? "1 год и более" : "Frontend"}
          </div>
          <div
            className={style.option}
            onClick={() =>
              handleOptionClick(
                `${
                  title === "Ваш опыт работы" ? "от 2 до 5 лет" : "FullStack"
                }`,
              )
            }>
            {title === "Ваш опыт работы" ? "от 2 до 5 лет" : "FullStack"}
          </div>
        </div>
      )}
      {selectedValue === "Frontend" && (
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
      {selectedValue === "Backend" && (
        <div className={style.technology}>
          <label htmlFor='nameInput'>Ваш стек</label>
          <div className={style.element}>
            <CheckBox /> <span>Python</span>
          </div>
          <div className={style.element}>
            <CheckBox /> <span>Docker</span>
          </div>
          <div className={style.element}>
            <CheckBox /> <span>NodeJs</span>
          </div>
        </div>
      )}
      {selectedValue === "FullStack" && (
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
          <div className={style.element}>
            <CheckBox /> <span>Python</span>
          </div>
          <div className={style.element}>
            <CheckBox /> <span>Docker</span>
          </div>
          <div className={style.element}>
            <CheckBox /> <span>NodeJs</span>
          </div>
        </div>
      )}
    </div>
  );
};
