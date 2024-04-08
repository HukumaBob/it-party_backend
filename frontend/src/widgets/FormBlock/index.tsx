import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TFormValues } from "../../app/types/types";
import style from "./index.module.scss";
import { Form } from "../../features/form";

import { CheckBox } from "../../shared/checkbox";
import arrow_down from "../../app/assets/icons/arrow_down.svg";
import checkIcon from "../../app/assets/icons/check_mini.svg";
export const FormBlock = () => {
  const [clickExperience, setClickExperience] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState("");

  const [clickDirection, setClickDirection] = useState(false);
  const [selectedDirection, setSelectedDirection] = useState("");

  const [onlineChecked, setOnlineChecked] = useState(false);
  const [offlineChecked, setOfflineChecked] = useState(false);

  const [agreementChecked, setAgreementChecked] = useState(false);
  const [agreementPersonInfoChecked, setAgreementPersonInfoChecked] =
    useState(false);

  const handleOnlineChange = () => {
    setOnlineChecked(!onlineChecked);
  };

  const handleOfflineChange = () => {
    setOfflineChecked(!offlineChecked);
  };
  const handleAgreementChange = () => {
    setAgreementChecked(!agreementChecked);
  };
  const handleAgreementPersonInfoChange = () => {
    setAgreementPersonInfoChecked(!agreementPersonInfoChecked);
  };

  const handleClickExperience = () => {
    setClickExperience(!clickExperience);
  };

  const handleClickDirection = () => {
    setClickDirection(!clickDirection);
  };

  const handleOptionClickExperience = (value: string) => {
    setSelectedExperience(value);
    setClickExperience(false);
    setValue("experience", value);
  };

  const handleOptionClickDirection = (value: string) => {
    setSelectedDirection(value);
    setClickDirection(false);
    setValue("direction", value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm<TFormValues>({
    mode: "onTouched",
  });

  const onSubmit = (data: TFormValues) => {
    const formData = {
      ...data,
      onlineChecked: onlineChecked,
      offlineChecked: offlineChecked,
    };
    fetch("", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Ошибка отправки данных на сервер");
      })
      .then((responseData) => {
        alert(
          "Ваша форма успешно отправлена. Ожидайте подтверждения регистрации.",
        );
        reset();
      })
      .catch((error) => {
        console.error("Ошибка:", error);
        alert("Произошла ошибка при отправке формы. Попробуйте еще раз позже.");
      });
    reset();
    setOnlineChecked(false);
    setOfflineChecked(false);
    setAgreementChecked(false);
    setSelectedExperience("");
    setSelectedDirection("");
  };

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <Form nameForm={"Персональные данные"}>
        <div className={style.name_form}>
          <label>
            Имя <span>*</span>
          </label>
          <input
            type='text'
            placeholder='Иван'
            {...register("name", {
              required: "Необходимо для регистрации на мероприятие",
              minLength: {
                value: 2,
                message: "Слишком короткое имя",
              },
              pattern: {
                value: /^[A-ZА-Я]+$/i,
                message: "Некорректное имя",
              },
            })}
          />

          <span className={`${errors.name ? style.error : style.message}`}>
            {errors?.name?.message ||
              "Необходимо для регистрации на мероприятие"}
          </span>
        </div>

        <div className={style.name_form}>
          <label>
            Фамилия <span>*</span>
          </label>
          <input
            type='text'
            placeholder='Иван'
            {...register("secondName", {
              required: "Необходимо для регистрации на мероприятие",
              minLength: {
                value: 2,
                message: "Слишком короткая фамилия",
              },
              pattern: {
                value: /^[A-ZА-Я]+$/i,
                message: "Некорректное имя",
              },
            })}
          />
          <span
            className={`${errors.secondName ? style.error : style.message}`}>
            {errors?.secondName?.message ||
              "Необходимо для регистрации на мероприятие"}
          </span>
        </div>
      </Form>
      <Form nameForm={"Контакты"}>
        <div className={style.name_form}>
          <label>
            Email <span>*</span>
          </label>
          <input
            type='email'
            placeholder='ivan@ya.ru'
            {...register("email", {
              required: "Необходимо для регистрации на мероприятие",
              pattern: {
                value: /^[A-ZА-Я0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message:
                  "Формат адреса электронной почты неверный. Пожалуйста, введите его правильно",
              },
            })}
          />

          <span className={`${errors.email ? style.error : style.message}`}>
            {errors?.email?.message ||
              "Необходимо для регистрации на мероприятие"}
          </span>
        </div>

        <div className={style.name_form}>
          <label>
            Номер телефона<span>*</span>
          </label>
          <input
            type='number'
            placeholder='+79521120101'
            {...register("phoneNumber", {
              required: "Необходимо для регистрации на мероприятие",
              minLength: {
                value: 11,
                message: "Введен некорректный номер телефона",
              },
            })}
          />

          <span
            className={`${errors.phoneNumber ? style.error : style.message}`}>
            {errors?.phoneNumber?.message ||
              "Необходимо для регистрации на мероприятие"}
          </span>
        </div>
      </Form>
      <Form nameForm={"Работа"}>
        <div className={style.name_form}>
          <label>
            Место работы <span>*</span>
          </label>
          <input
            type='text'
            placeholder='Yandex Tech'
            {...register("workplace", {
              required: "Необходимо для регистрации на мероприятие",
              minLength: {
                value: 2,
                message: "Слишком короткое название",
              },
              pattern: {
                value: /^\w+(\s+\w+)*$/i,
                message: "Некорректное название",
              },
            })}
          />
          <span className={`${errors.workplace ? style.error : style.message}`}>
            {errors?.workplace?.message ||
              "Необходимо для регистрации на мероприятие"}
          </span>
        </div>
        <div className={style.name_form}>
          <label>
            Должность <span>*</span>
          </label>
          <input
            type='text'
            placeholder='Frontend Developer'
            {...register("post", {
              required: "Необходимо для регистрации на мероприятие",
              minLength: {
                value: 2,
                message: "Слишком короткое название",
              },
              pattern: {
                value: /^\w+(\s+\w+)*$/i,
                message: "Некорректное название",
              },
            })}
          />
          <span className={`${errors.post ? style.error : style.message}`}>
            {errors?.post?.message ||
              "Необходимо для регистрации на мероприятие"}
          </span>
        </div>

        <div className={style.container_selectInput}>
          <label>
            Ваш опыт работы <span className={style.star}>*</span>
          </label>
          <div className={style.customSelect} onClick={handleClickExperience}>
            <span>{selectedExperience || "Не выбран"}</span>
            <img src={arrow_down} alt='arrow' />
          </div>
          <span className={style.required}>
            Необходимо для регистрации на мероприятие
          </span>
          {clickExperience && (
            <div className={style.options}>
              <div
                className={style.option}
                onClick={() => handleOptionClickExperience("До 1 года")}>
                До 1 года
              </div>
              <div
                className={style.option}
                onClick={() => handleOptionClickExperience("1 год и более")}>
                1 год и более
              </div>
              <div
                className={style.option}
                onClick={() => handleOptionClickExperience("от 2 до 5 лет")}>
                от 2 до 5 лет
              </div>
            </div>
          )}
        </div>
        <div className={style.container_selectInput}>
          <label>
            Ваше направление <span className={style.star}>*</span>
          </label>
          <div className={style.customSelect} onClick={handleClickDirection}>
            <span>{selectedDirection || "Не выбрано"}</span>
            <img src={arrow_down} alt='arrow' />
          </div>
          <span
            className={`${
              selectedDirection === "Не выбрано" ? style.error : style.required
            }`}>
            Необходимо для регистрации на мероприятие
          </span>
          {clickDirection && (
            <div className={style.options}>
              <div
                className={style.option}
                onClick={() => handleOptionClickDirection("Frontend")}>
                Frontend
              </div>
              <div
                className={style.option}
                onClick={() => handleOptionClickDirection("Backend")}>
                Backend
              </div>
              <div
                className={style.option}
                onClick={() => handleOptionClickDirection("FullStack")}>
                FullStack
              </div>
            </div>
          )}
          {selectedDirection === "Frontend" && (
            <div className={style.technology}>
              <label>Ваш стек</label>
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
          {selectedDirection === "Backend" && (
            <div className={style.technology}>
              <label>Ваш стек</label>
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
          {selectedDirection === "FullStack" && (
            <div className={style.technology}>
              <label>Ваш стек</label>
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
      </Form>
      <Form nameForm={"Формат участия"}>
        <div className={style.element}>
          <div className={style.container_checkbox}>
            <div className={style.customCheckBox} onClick={handleOnlineChange}>
              {onlineChecked ? <img src={checkIcon} alt='check' /> : ""}
            </div>
          </div>
          <span>Онлайн</span>
        </div>
        <div className={style.element}>
          <div className={style.container_checkbox}>
            <div className={style.customCheckBox} onClick={handleOfflineChange}>
              {offlineChecked ? <img src={checkIcon} alt='check' /> : ""}
            </div>
          </div>
          <span>Оффлайн</span>
        </div>
      </Form>
      <div className={style.agreementBlock}>
        <div className={style.agreement}>
          <div className={style.agreement_text}>
            <div className={style.container_checkbox}>
              <div
                className={style.customCheckBox}
                onClick={handleAgreementChange}>
                {agreementChecked ? <img src={checkIcon} alt='check' /> : ""}
              </div>
            </div>
            <p>
              *Я даю свое согласие на передачу в ООО «ЯНДЕКС» анкеты, содержащей
              мой персональные данные, и согласен с тем, что они будут храниться
              в ООО «ЯНДЕКС» в течение 10 лет и будут использованы исключительно
              для целей приглашения меня к участию в мероприятиях группы
              компаний «ЯНДЕКС», в соответствии с Федеральным законом «
              персональных данных».
            </p>
          </div>
          <span>Cоглашение обязательно</span>
        </div>

        <div className={style.agreement}>
          <div className={style.agreement_text}>
            <div className={style.container_checkbox}>
              <div
                className={style.customCheckBox}
                onClick={handleAgreementPersonInfoChange}>
                {agreementPersonInfoChecked ? (
                  <img src={checkIcon} alt='check' />
                ) : (
                  ""
                )}
              </div>
            </div>
            <p>
              Я даю свое согласие на передачу в ООО «ЯНДЕКС» резюме и/или
              анкеты, содержащих мои персональные данные, и согласен с тем, что
              они будут храниться в ООО «ЯНДЕКС» в течение 10 лет и будут
              обрабатываться исключительно для целей предложения мне вакансий
              группы компаний «ЯНДЕКС», в соответствии с Федеральным законом «О
              персональных данных».
            </p>
          </div>
          <span>Cоглашение не обязательно</span>
        </div>
      </div>
      <div className={style.buttonBlock}>
        <button
          type='submit'
          className={
            !(
              isValid &&
              selectedDirection &&
              selectedExperience &&
              agreementChecked &&
              (onlineChecked || offlineChecked)
            )
              ? style.disabled
              : style.submit
          }
          disabled={
            !(
              isValid &&
              selectedDirection &&
              selectedExperience &&
              agreementChecked &&
              (onlineChecked || offlineChecked)
            )
          }>
          Зарегистрироваться
        </button>
      </div>
    </form>
  );
};
