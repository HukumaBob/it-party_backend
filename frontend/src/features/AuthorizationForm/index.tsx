import React, { useState } from "react";
import style from "./index.module.scss";
import { useForm } from "react-hook-form";
import closeIcon from "../../app/assets/icons/close_mini.svg";
import {
  setOpenModal,
  setShowPassword,
} from "../../app/services/slices/authorization";
import { useDispatch, useSelector } from "../../app/types/hooks";
import { TFormAuthorization } from "../../app/types/types";
import yandex from "../../app/assets/icons/Yandex.svg";
import eyeIcon from "../../app/assets/icons/eye.svg";
import eyeSlashedIcon from "../../app/assets/icons/eye-slashed.svg";

export const AuthorizationForm = () => {
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(setOpenModal(false));
  };
  const { showPassword } = useSelector((state) => state.authorization);
  const handleClick = () => {
    dispatch(setShowPassword(!showPassword));
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TFormAuthorization>({
    mode: "onTouched",
  });

  const onSubmit = (data: TFormAuthorization) => {
    fetch("http://localhost:8000/auth/jwt/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
  };
  return (
    <div className={style.container}>
      <section className={style.titleBlock}>
        <img
          src={closeIcon}
          alt='CloseIcon'
          className={style.icon}
          onClick={handleCloseModal}
        />
        <h2 className={style.title}>Авторизация</h2>
      </section>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.inputBlock}>
          <label>Email</label>

          <input
            className={`${errors.email ? style.errorInput : style.input}`}
            type='email'
            placeholder='ivan@ya.ru'
            {...register("email", {
              required: "Обязательное поле",
              pattern: {
                value: /^[A-ZА-Я0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Неверный формат почты",
              },
            })}
          />
          {errors.email?.message && (
            <span className={`${errors.email ? style.error : style.message}`}>
              {errors.email.message}
            </span>
          )}
        </div>
        <div className={style.inputBlock}>
          <label>Пароль</label>
          <label
            className={`${
              errors.email ? style.eyeIconWithError : style.eyeIcon
            }`}
            onClick={handleClick}>
            {showPassword ? (
              <img src={eyeSlashedIcon} alt='eyeSlashedIcon' />
            ) : (
              <img src={eyeIcon} alt='eyeIcon' />
            )}
          </label>
          <input
            type={`${showPassword ? "text" : "password"}`}
            className={`${errors.password ? style.errorInput : style.input}`}
            placeholder='********'
            {...register("password", {
              required: "Обязательное поле",
              minLength: {
                value: 8,
                message: "Слишком короткий пароль",
              },
              pattern: {
                value: /^(?=.*[A-ZА-Я])(?=.*\d)[A-Za-zА-Яа-я\d._%+-]{8,}$/i,
                message: "Пароль должен содержать минимум 1 цифру или букву",
              },
            })}
          />
          {errors.password?.message && (
            <span
              className={`${errors.password ? style.error : style.message}`}>
              {errors.password.message}
            </span>
          )}
        </div>
        <div className={style.forgotPasswod}>
          <span>Не помню пароль</span>
        </div>
        <button type='submit' className={style.button}>
          Войти
        </button>
      </form>
      <p className={style.lineBlock}>
        <span className={style.line}></span> или{" "}
        <span className={style.line}></span>{" "}
      </p>
      <div className={style.buttonBlock}>
        <button type='button' className={style.buttonYandex}>
          <img src={yandex} alt='yandex' /> Войти с Яндекс ID
        </button>
        <button type='button' className={style.buttonRegister}>
          Зарегистрироваться
        </button>
      </div>
      <span className={style.loginProblem}>Проблемы со входом?</span>
    </div>
  );
};
