import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { TFormDataPersonalValues, TUserProfileValues, getItem } from "../../app/types/types";
import { editingDataPersonal, getFormProfile } from "../../app/api/api";
import style from "./index.module.scss";
import { SelectDate } from "../../shared/selectDate/index";
import arrow_down from "../../app/assets/icons/arrow_down.svg";
import { useDispatch, useSelector } from "../../app/types/hooks";
import {
  setClickMaritalStatus,
  setSelectedMaritalStatus,
} from "../../app/services/slices/formSlice";
export const FormDataPersonal = () => {
  const dispatch = useDispatch();
  
  const {
    selectedMaritalStatus,
    clickMaritalStatus,
    selectedNavDataPersonal,
  } = useSelector((state) => state.form);

  const handleClickMaritalStatus = () => {
    dispatch(setClickMaritalStatus(!clickMaritalStatus));
  };

  const handleClickResetValueFirstName = () => {
    const profileStorage = getItem("updateInfo");
    if(profileStorage !== null && profileStorage !== undefined) {
      const profile = localStorage.getItem("updateInfo");
      const profileData = profile ? JSON.parse(profile) : {};
      const value: string = profileData ? profileData.first_name : "";
      setValue("first_name", value);
    } else {
      setValue("first_name", "");
    }
  };

  const handleClickResetValueLastName = () => {
    const profileStorage = getItem("updateInfo");
    if(profileStorage !== null && profileStorage !== undefined) {
      const profile = localStorage.getItem("updateInfo");
      const profileData = profile ? JSON.parse(profile) : {};
      const value: string = profileData ? profileData.last_name : "";
      setValue("last_name", value);
    } else {
      setValue("last_name", "");
    }
  };

  const handleClickResetValueCountry = () => {
    const profileStorage = getItem("updateInfo");
    if(profileStorage !== null && profileStorage !== undefined) {
      const profile = localStorage.getItem("updateInfo");
      const profileData = profile ? JSON.parse(profile) : {};
      const value: string = profileData ? profileData.country : "";
      setValue("country", value);
    } else {
      const value: string = "";
      setValue("country", value);
    }
  };

  const handleOptionClickMaritalStatus = (value: number) => {
    dispatch(setSelectedMaritalStatus(value));
    dispatch(setClickMaritalStatus(false));
    setValue("familystatus", value);
  };

  const schemaDataPersonal = yup.object().shape({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    date_of_birth: yup.string(),
    familystatus: yup.number(),
    country: yup.string(),
  }).required();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm<TFormDataPersonalValues>({
    mode: "onTouched", resolver: yupResolver(schemaDataPersonal),
  });

  const onSubmit = (data: TFormDataPersonalValues) => {
    editingDataPersonal(data)
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
    dispatch(setSelectedMaritalStatus(0));
  };

  return (
    <form className={selectedNavDataPersonal ? style.form : style.formHide} id="formDataPersonal" onSubmit={handleSubmit(onSubmit)}>
      <div className="style.form_container">
        <h3 className={style.form_title}>Персональные данные</h3>
        <div className={style.name_form}>
          <label>
            Имя <span>*</span>
          </label>
          <div className={style.inputBlock}>
            <input
              className={`${errors.first_name ? style.errorInput : style.message}`}
              type='text'
              placeholder='Владимир'
              {...register("first_name", {
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
            <button type="button" className="style.button" onClick={handleClickResetValueFirstName}></button>
          </div>

          <span className={`${errors.first_name ? style.error : style.message}`}>
            {errors?.first_name?.message ||
              "Необходимо для регистрации на мероприятие"}
          </span>
        </div>

        <div className={style.name_form}>
          <label>
            Фамилия <span>*</span>
          </label>
          <div className={style.inputBlock}>
            <input
              className={`${errors.last_name ? style.errorInput : ""}`}
              type='text'
              placeholder='Белоголовцев'
              {...register("last_name", {
                required: "Необходимо для регистрации на мероприятие",
                minLength: {
                  value: 2,
                  message: "Слишком короткая фамилия",
                },
                pattern: {
                  value: /^[A-ZА-Я]+$/i,
                  message: "Некорректная фамилия",
                },
              })}
            />
            <button type="button" className="style.button" onClick={handleClickResetValueLastName}></button>
          </div>
          
          <span
            className={`${errors.last_name ? style.error : style.message}`}>
            {errors?.last_name?.message ||
              "Необходимо для регистрации на мероприятие"}
          </span>
        </div>
        <div className={style.name_form}>
          <label>
            Страна
          </label>
          <div className={style.inputBlock}>
            <input
              className={`${errors.country? style.errorInput : ""}`}
              type='text'
              placeholder='Россия'
              {...register("country", {
                minLength: {
                  value: 2,
                  message: "Слишком короткое название страны",
                },
              })}
            />
            <button type="button" className="style.button" onClick={handleClickResetValueCountry}></button>
          </div>
          
        </div>
        <div className={style.name_form}>
          <label>
            Дата рождения
          </label>
          <input
            className={`${errors.date_of_birth ? style.errorInput : ""}`}
            type='text'
            placeholder='_ _._ _._ _ _ _'
            {...register("date_of_birth", {
              pattern: {
                value: /^\d{2}-\d{2}-\d{4}$/,
                message: "Некорректная дата",
              }
            })}
          />
          <SelectDate id='2'/>
        </div>
        <div className={style.container_selectInput}>
          <label>
            Семейное положение
          </label>
          <div className={style.customSelect} onClick={handleClickMaritalStatus}>
            <span>{(selectedMaritalStatus === 0 && "Не выбран") ||
                   (selectedMaritalStatus === 1 && "Холост / Не замужем") ||
                   (selectedMaritalStatus === 2 && "Женат / Замужем") ||
                   (selectedMaritalStatus === 3 && "Разведен / Разведена")
                   }</span>
            <img src={arrow_down} alt='arrow' />
          </div>
          {clickMaritalStatus && (
            <div className={style.options}>
              <div
                className={selectedMaritalStatus !== 1 ? style.option : style.optionHide}
                onClick={() => handleOptionClickMaritalStatus(1)}>
                Холост / Не замужем
              </div>
              <div
                className={selectedMaritalStatus !== 2 ? style.option : style.optionHide}
                onClick={() => handleOptionClickMaritalStatus(2)}>
                Женат / Замужем
              </div>
              <div
                className={selectedMaritalStatus !== 3 ? style.option : style.optionHide}
                onClick={() => handleOptionClickMaritalStatus(3)}>
                Разведен / Разведена
              </div>
            </div>
          )}
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