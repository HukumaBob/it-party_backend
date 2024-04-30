import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { TFormConfidentialityValues, TUserProfileValues, getItem } from "../../app/types/types";
import { editingConfidentiality, getFormProfile } from "../../app/api/api";
import style from "./index.module.scss";
import checkIcon from "../../app/assets/icons/check_mini.svg";
import { useDispatch, useSelector } from "../../app/types/hooks";
import {
  setOfflineCheckedFormAboutMe,
  setOnlineCheckedFormAboutMe,
} from "../../app/services/slices/formSlice";
export const FormConfidentiality = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState<string>('');
  const [isLoad, setLoad] = useState<boolean>(false);
  const {
    onlineCheckedFormAboutMe,
    offlineCheckedFormAboutMe,
    selectedNavConfidentiality,
  } = useSelector((state) => state.form);

  const schemaFormAboutMe = yup.object().shape({
    email: yup.string().required(),
    phone: yup.string().required(),
    current_password: yup.string().required(),
    new_password: yup.string().required(),
  }).required();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm<TFormConfidentialityValues>({
    mode: "onTouched", resolver: yupResolver(schemaFormAboutMe),
  });

  const handleOfflineChange = () => {
    dispatch(setOfflineCheckedFormAboutMe(!offlineCheckedFormAboutMe));
  };

  const handleOnlineChange = () => {
    dispatch(setOnlineCheckedFormAboutMe(!onlineCheckedFormAboutMe));
  };

  const onSubmit = (data: TFormConfidentialityValues) => {
    setLoad(true);
    editingConfidentiality(data)
      .then(() => {
        getFormProfile()
          .then((data: TUserProfileValues) => {
            localStorage.setItem("updateInfo", JSON.stringify(data));
            alert(
              "Данные успешно обновлены.",
            );
          })
          .catch((err) => {
            console.error("Ошибка:", err);
          })
      })
      .catch((error) => {
        setError(error);
        alert("Произошла ошибка при отправке формы. Попробуйте еще раз позже.");
      })
      .finally(() => {
        setLoad(false);
      });
    reset();
    dispatch(setOfflineCheckedFormAboutMe(false));
    dispatch(setOnlineCheckedFormAboutMe(false));
  };

  return (
    <form className={selectedNavConfidentiality ? style.form : style.formHide} onSubmit={handleSubmit(onSubmit)} id="formConfidentiality">
      <div className="style.form_container">
        <h3 className={style.form_title}>Настройки безопасности</h3>
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
              errors.phone ? style.errorInput : style.message
            }`}
            type='number'
            placeholder='+79521120101'
            {...register("phone", {
              required: "Необходимо для регистрации на мероприятие",
              minLength: {
                value: 11,
                message: "Введен некорректный номер телефона",
              },
            })}
          />

          <span
            className={`${errors.phone? style.error : style.message}`}>
            {errors?.phone?.message ||
              "Необходимо для регистрации на мероприятие"}
          </span>
        </div>
      </div>
      <div className={style.buttonBlock}>
        <button
          type='submit'
          className={
            !(
              isValid
            )
              ? style.disabled
              : style.submit
          }
          disabled={
            !(
              isValid
            )
          }>
          Сохранить
        </button>
      </div>
    </form>
  );
};