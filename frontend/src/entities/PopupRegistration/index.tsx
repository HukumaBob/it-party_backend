import React from "react";
import style from "./index.module.scss";
import close from "../../app/assets/icons/close_mini.svg";

import {TPopupRegistration } from "../../app/types/types";
import { FormBlock } from "../../widgets/FormBlock";

export const PopupRegistration = ({ onClose }: TPopupRegistration) => {
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
        <FormBlock />
      </div>
    </div>
  );
};
