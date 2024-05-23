import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { TFormDataPersonalValues, TUserProfileValues} from "../../app/types/types";
import { editingDataPersonal, getFormProfile } from "../../app/api/api";
import style from "./index.module.scss";
import checkIcon from "../../app/assets/icons/check_mini.svg";
import { useDispatch, useSelector } from "../../app/types/hooks";
import {
  setOfflineCheckedFormAboutMe,
  setOnlineCheckedFormAboutMe,
} from "../../app/services/slices/formSlice";
export const FormAboutMe = () => {
  const dispatch = useDispatch();
  /*const [error, setError] = useState<string>('');
  const [isLoad, setLoad] = useState<boolean>(false);*/
  const {
    onlineCheckedFormAboutMe,
    offlineCheckedFormAboutMe,
    selectedNavAboutMe,
  } = useSelector((state) => state.form);

  const schemaFormAboutMe = yup.object().shape({
    hobby: yup.string(),
    values: yup.string(),
    aims: yup.string(),
    cv: yup.string(),
    motivation: yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm<TFormDataPersonalValues>({
    mode: "onTouched", resolver: yupResolver(schemaFormAboutMe),
  });

  const handleOfflineChange = () => {
    dispatch(setOfflineCheckedFormAboutMe(!offlineCheckedFormAboutMe));
  };

  const handleOnlineChange = () => {
    dispatch(setOnlineCheckedFormAboutMe(!onlineCheckedFormAboutMe));
  };

  const onSubmit = (data: TFormDataPersonalValues) => {
    const formData = {
      ...data,
      online: onlineCheckedFormAboutMe,
      offline: offlineCheckedFormAboutMe,
    };
    editingDataPersonal(formData)
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
        alert("Произошла ошибка при отправке формы. Попробуйте еще раз позже.");
      })
    reset();
    dispatch(setOfflineCheckedFormAboutMe(false));
    dispatch(setOnlineCheckedFormAboutMe(false));
  };

  return (
    <form className={selectedNavAboutMe ? style.form : style.formHide} onSubmit={handleSubmit(onSubmit)} id="#formAboutMe">
      <h3 className={style.form_title}>Это поможет подобрать вам ивенты</h3>
      <div className={style.name_form}>
        <label>
          Хобби
        </label>
        <input
          className={`${errors.hobby ? style.errorInput : style.message}`}
          type='text'
          placeholder='Напишите о своих увлечениях и хобби'
          {...register("hobby", {
            maxLength: {
              value: 255,
              message: "Слишком длинное описание",
            },
          })}
        />
      </div>
      <div className={style.name_form}>
        <label>
          Ценности
        </label>
        <input
          className={`${errors.values ? style.errorInput : style.message}`}
          type='text'
          placeholder='Напишите о своих увлечениях и хобби'
          {...register("values", {
            maxLength: {
              value: 255,
              message: "Слишком длинное описание",
            },
          })}
        />            
      </div>
      <div className={style.name_form}>
        <label>
          Цели
        </label>
        <input
          className={`${errors.aims ? style.errorInput : style.message}`}
          type='text'
          placeholder='Напишите о своих увлечениях и хобби'
          {...register("aims", {
            maxLength: {
              value: 255,
              message: "Слишком длинное описание",
            },
          })}
        />
      </div>
      <div className={style.name_form}>
        <label>
          Образ жизни
        </label>
        <input
          className={`${errors.cv ? style.errorInput : style.message}`}
          type='text'
          placeholder='Напишите о своих увлечениях и хобби'
          {...register("cv", {
            maxLength: {
              value: 255,
              message: "Слишком длинное описание",
            },
          })}
        />
      </div>
      <div className={style.name_form}>
        <label>
          Мотивация
        </label>
        <input
          className={`${errors.motivation ? style.errorInput : style.message}`}
          type='text'
          placeholder='Напишите о своих увлечениях и хобби'
          {...register("motivation", {
            maxLength: {
              value: 255,
              message: "Слишком длинное описание",
            },
          })}
        />
      </div>
      <div className={style.element}>
        <div className={style.element_checkboxBlock}>
          <h3 className={style.element_title}>
            Формат мероприятий
          </h3>
          <p className={style.element_subtitle}>
            Какой формат мероприятий вы предпочитаете?
          </p>
          <div className={style.container_checkbox}>
            <div className={style.customCheckBox} onClick={handleOnlineChange}>
              {onlineCheckedFormAboutMe ? <img src={checkIcon} alt='check' /> : ""}
            </div>
          </div>
          <span>Онлайн</span>
          <div className={style.container_checkbox}>
            <div className={style.customCheckBox} onClick={handleOfflineChange}>
              {offlineCheckedFormAboutMe ? <img src={checkIcon} alt='check' /> : ""}
            </div>
          </div>
          <span>Оффлайн</span>
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