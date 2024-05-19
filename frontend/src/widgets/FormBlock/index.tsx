import React from "react";
import { useForm } from "react-hook-form";
import { TFormValues } from "../../app/types/types";
import style from "./index.module.scss";
import { Form } from "../../features/form";

import { CheckBox } from "../../shared/checkbox";
import arrow_down from "../../app/assets/icons/arrow_down.svg";
import checkIcon from "../../app/assets/icons/check_mini.svg";
import { useDispatch, useSelector } from "../../app/types/hooks";
import {
  setAgreementChecked,
  setAgreementPersonInfoChecked,
  setClickDirection,
  setClickExperience,
  setOfflineChecked,
  setOnlineChecked,
  setSelectedDirection,
  setSelectedExperience,
} from "../../app/services/slices/formSlice";

import { postEvent } from "../../app/api/api";
export const FormBlock = ({ id }: { id: number }) => {
  const dispatch = useDispatch();
  const {
    clickDirection,
    clickExperience,
    onlineChecked,
    offlineChecked,
    agreementChecked,
    agreementPersonInfoChecked,
    selectedDirection,
    selectedExperience,
  } = useSelector((state) => state.form);

  const handleOnlineChange = () => {
    dispatch(setOnlineChecked(!onlineChecked));
  };

  const handleOfflineChange = () => {
    dispatch(setOfflineChecked(!offlineChecked));
  };
  const handleAgreementChange = () => {
    dispatch(setAgreementChecked(!agreementChecked));
  };
  const handleAgreementPersonInfoChange = () => {
    dispatch(setAgreementPersonInfoChecked(!agreementPersonInfoChecked));
  };

  const handleClickExperience = () => {
    dispatch(setClickExperience(!clickExperience));
  };

  const handleClickDirection = () => {
    dispatch(setClickDirection(!clickDirection));
  };

  const handleOptionClickExperience = (value: string) => {
    dispatch(setSelectedExperience(value));
    dispatch(setClickExperience(false));
    setValue("experience", value);
  };

  const handleOptionClickDirection = (value: string) => {
    dispatch(setSelectedDirection(value));
    dispatch(setClickDirection(false));
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
    dispatch(postEvent({ id, data: formData }));
    reset();
    dispatch(setOnlineChecked(false));
    dispatch(setOfflineChecked(false));
    dispatch(setAgreementChecked(false));
    dispatch(setAgreementPersonInfoChecked(false));
    dispatch(setSelectedExperience(""));
    dispatch(setSelectedDirection(""));
  };

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <Form nameForm={"Персональные данные"}>
        <div className={style.name_form}>
          <label>
            Имя <span>*</span>
          </label>
          <input
            className={`${errors.name ? style.errorInput : style.message}`}
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
            className={`${errors.secondName ? style.errorInput : ""}`}
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
            className={`${errors.email ? style.errorInput : style.message}`}
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
            className={`${
              errors.phoneNumber ? style.errorInput : style.message
            }`}
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
            className={`${errors.workplace ? style.errorInput : style.message}`}
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
            className={`${errors.post ? style.errorInput : style.message}`}
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
