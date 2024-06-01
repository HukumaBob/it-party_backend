import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { TFormDataPersonalValues, TUserProfileValues} from "../../app/types/types";
import { editingDataPersonal } from "../../app/api/api";
import style from "./index.module.scss";
import checkIcon from "../../app/assets/icons/check_mini.svg";
import { useDispatch, useSelector } from "../../app/types/hooks";
import {
  setOfflineCheckedFormAboutMe,
  setOnlineCheckedFormAboutMe,
} from "../../app/services/slices/profileSlice";
export const FormAboutMe = () => {
  const dispatch = useDispatch();
  const { place_of_work,
          position,
          hobby,
          values,
          aims,
          cv,
          motivation
  } = useSelector((state) => state.profile);

  React.useEffect(() => {
    if(place_of_work !== "") {
      setValue("place_of_work", place_of_work);
    };
    if(position !== "") {
      setValue("position", position);
    };
    if(hobby !== "") {
      setValue("hobby", hobby);
    };
    if(values !== "") {
      setValue("values", values);
    };
    if(aims !== "") {
      setValue("aims", aims);
    };
    if(cv !== "") {
      setValue("cv", cv);
    };
    if(motivation !== "") {
      setValue("motivation", motivation);
    }; 
  }, []);

  const {
    onlineCheckedFormAboutMe,
    offlineCheckedFormAboutMe,
    selectedNavAboutMe,
  } = useSelector((state) => state.profile);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<TFormDataPersonalValues>({
    mode: "onTouched",
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
    const elements:TFormDataPersonalValues = formData;
    let promise = new Promise<TFormDataPersonalValues>((resolve) => {
      let objectData: TFormDataPersonalValues = {};
      for(const key in elements) {
        const keyCurrent = key;
        if(elements[key] !== undefined && elements[key] !== "") {
          objectData[keyCurrent] = elements[keyCurrent];
        } else {
          continue;
        }
      }
      resolve (objectData);
    })
    promise.then((objectData: TFormDataPersonalValues) => {
      editingDataPersonal(objectData)
        .then((data: TUserProfileValues) => {
          localStorage.setItem("updateInfo", JSON.stringify(data));
          dispatch(setOfflineCheckedFormAboutMe(data.offline));
          dispatch(setOnlineCheckedFormAboutMe(data.online));
          alert(
            "Данные успешно обновлены.",
          );
        })
        .catch((error) => {
          console.log(error);
          alert("Произошла ошибка при отправке формы. Попробуйте еще раз позже.");
        })
    })
  };

  return (
    <form className={selectedNavAboutMe ? style.form : style.formHide} onSubmit={handleSubmit(onSubmit)} id="#formAboutMe">
      <div className={style.form_container}>
        <h3 className={style.form_title}>Это поможет подобрать вам ивенты</h3>
        <div className={style.name_form}>
          <label>
            Хобби
          </label>
          <textarea
            className={errors.hobby ? style.errorInput : ""}
            placeholder='Напишите о своих увлечениях и хобби'
            maxLength={256}
            {...register("hobby", {
              required: "Обязательное поле",
              maxLength: {
                value: 255,
                message: "Слишком длинное описание",
              },
            })}
          />
          <span className={errors.hobby ? style.error : style.message}>
            {errors?.hobby?.message || ""}
          </span>
        </div>
        <div className={style.name_form}>
          <label>
            Ценности
          </label>
          <textarea
            className={errors.values ? style.errorInput : ""}
            placeholder='Напишите о своих ценностях, жизненной позиции'
            maxLength={256}
            {...register("values", {
              required: "Обязательное поле",
              maxLength: {
                value: 255,
                message: "Слишком длинное описание",
              },
            })}
          />
          <span className={errors.values ? style.error : style.message}>
            {errors?.values?.message || ""}
          </span>           
        </div>
        <div className={style.name_form}>
          <label>
            Цели
          </label>
          <textarea
            className={errors.aims ? style.errorInput : ""}
            placeholder='Напишите о своих целях и стремлениях'
            maxLength={256}
            {...register("aims", {
              required: "Обязательное поле",
              maxLength: {
                value: 255,
                message: "Слишком длинное описание",
              },
            })}
          />
          <span className={errors.aims ? style.error : style.message}>
            {errors?.aims?.message || ""}
          </span>
        </div>
        <div className={style.name_form}>
          <label>
            Образ жизни
          </label>
          <textarea
            className={errors.cv ? style.errorInput : ""}
            placeholder='Напишите коротко о себе'
            maxLength={256}
            {...register("cv", {
              required: "Обязательное поле",
              maxLength: {
                value: 255,
                message: "Слишком длинное описание",
              },
            })}
          />
          <span className={errors.cv ? style.error : style.message}>
            {errors?.cv?.message || ""}
          </span>
        </div>
        <div className={style.name_form}>
          <label>
            Мотивация
          </label>
          <textarea
            className={errors.motivation ? style.errorInput : ""}
            placeholder='Напишите о своей мотивации'
            maxLength={256}
            {...register("motivation", {
              required: "Обязательное поле",
              maxLength: {
                value: 255,
                message: "Слишком длинное описание",
              },
            })}
          />
          <span className={errors.motivation ? style.error : style.message}>
            {errors?.motivation?.message || ""}
          </span>
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
              <span>Онлайн</span>
            </div>
            <div className={style.container_checkbox}>
              <div className={style.customCheckBox} onClick={handleOfflineChange}>
                {offlineCheckedFormAboutMe ? <img src={checkIcon} alt='check' /> : ""}
              </div>
              <span>Оффлайн</span>
            </div>
          </div>
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