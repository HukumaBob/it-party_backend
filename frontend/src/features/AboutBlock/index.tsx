import React from "react";
import style from "./index.module.scss";
import { RegistrationButton } from "../RegistrationButton";
export const AboutBlock = () => {
  return (
    <div className={style.container}>
      <p className={style.title}>
        <span>Cloud Security Meetup, 25 апреля 2024, </span>
        <span>Москва, Мулен Руж</span>
      </p>
      <p className={style.description}>
        Регистрация открыта.
        <span>Для регистрации необходимо заполнить форму.</span>
      </p>
      <div className={style.button}>
        <RegistrationButton/>
      </div>
    </div>
  );
};
