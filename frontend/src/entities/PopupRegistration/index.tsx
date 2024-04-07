import React, { useState } from "react";
import style from "./index.module.scss";
import close from "../../app/assets/icons/close_mini.svg";
import arrow_open from "../../app/assets/icons/arrow_open.svg";
import { TPopupRegistration } from "../../app/types/types";
import { TextInput } from "../../shared/inputs/textInput";
import { Form } from "../../features/form";
import { SelectInput } from "../../shared/inputs/selectInput";
import { CheckBox } from "../../shared/checkbox";

export const PopupRegistration = ({ onClose }: TPopupRegistration) => {
  const [isValid, setIsValid] = useState<boolean>(true);
  const handleClick = () => {
    if (isValid) {
      console.log(isValid);
      console.log("Форма отправлена");
    } else {
      console.log("Форма не может быть отправлена из-за ошибок валидации");
    }
  };
  return (
    <div className={style.wrapper}>
      <img
        src={close}
        alt='close'
        className={style.closeIcon}
        onClick={onClose}
      />
      <div className={style.container}>
        <h2 className={style.title}>Регистрация на Cloud Security Meetup</h2>
        <p className={style.description}>
          <span>
            Для регистрации на ивент необходимо заполнить эту форму и дождаться
            ответа по статусу вашей заявки.
          </span>
          <span>
            Эти данные помогут нам идентифицировать вас на мероприятии.
          </span>
          <span> Пожалуйста, заполните поля имя и фамилия кириллицей.</span>
        </p>
        <div className={style.form}>
          <Form nameForm={"Персональные данные"}>
            <TextInput title={"Имя"} placeholder={"Иван"} type='text' />
            <TextInput
              title={"Фамилия"}
              placeholder={"Иванов"}
              type='text'
              isValid={isValid}
            />
          </Form>
          <Form nameForm={"Контакты"}>
            <TextInput
              title={"Email"}
              placeholder={"ivan70@ya.ru"}
              type='email'
            />
            <TextInput
              title={"Номер телефона"}
              placeholder={"+7 999 888-77-66"}
              type='number'
            />
          </Form>
          <Form nameForm={"Работа"}>
            <TextInput
              title={"Место работы"}
              placeholder={"Укажите ваше место работы"}
              type='text'
            />
            <TextInput
              title={"Должность"}
              placeholder={"Укажите вашу должность"}
              type='number'
            />
            <SelectInput title={"Ваш опыт работы"} />
            <SelectInput title={"Ваше направление"} />
          </Form>
          <Form nameForm={"Формат участия"}>
            <div className={style.element}>
              <CheckBox /> <span>Онлайн</span>
            </div>
            <div className={style.element}>
              <CheckBox /> <span>Офлайн</span>
            </div>
          </Form>
        </div>
        <button type='submit' className={style.button}>
          Зарегистрироваться
        </button>
      </div>
    </div>
  );
};
