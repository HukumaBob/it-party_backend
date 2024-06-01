import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TFormDataPersonalValues, 
         TUserProfileValues, 
         getItem,
         TCountries } from "../../app/types/types";
import { editingDataPersonal } from "../../app/api/api";
import style from "./index.module.scss";
import { SelectDate } from "../../shared/selectDate/index";
import arrow_down from "../../app/assets/icons/arrow_down.svg";
import { useDispatch, useSelector } from "../../app/types/hooks";
import {
  setClickMaritalStatus,
  setSelectedMaritalStatus,
  setClickCountry,
  setSelectedCountry,
  setName,
  setSecondName
} from "../../app/services/slices/profileSlice";

export const FormDataPersonal = () => {
  const countriesStorage = localStorage.getItem("countries");
  const countryList = countriesStorage && JSON.parse(countriesStorage);
  const dispatch = useDispatch();
  const {
    selectedMaritalStatus,
    clickMaritalStatus,
    selectedNavDataPersonal,
    changeDateOfBirth,
    clickCountry,
    selectedCountry,
    name,
    secondName
  } = useSelector((state) => state.profile);
  
  React.useEffect(() => {
    if (name !== "") {
      setValue("first_name", name);
    };
    if(secondName !== "") {
      setValue("last_name", secondName);
    };
  }, []);

  const handleClickMaritalStatus = () => {
    dispatch(setClickMaritalStatus(!clickMaritalStatus));
  };

  const handleClickCountry = () => {
    dispatch(setClickCountry(!clickCountry));
  };

  const handleClickResetValueFirstName = () => {
    reset();
    const profileStorage = getItem("updateInfo");
    if (profileStorage !== null && profileStorage !== undefined) {
      const profile = localStorage.getItem("updateInfo");
      const profileData = profile ? JSON.parse(profile) : {};
      const value: string = profileData ? profileData.first_name : "";
      setValue("first_name", value);
    } else {
      setValue("first_name", "");
    }
  };

  const handleClickResetValueLastName = () => {
    reset();
    const profileStorage = getItem("updateInfo");
    if (profileStorage !== null && profileStorage !== undefined) {
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
    if (profileStorage !== null && profileStorage !== undefined) {
      const profile = localStorage.getItem("updateInfo");
      const profileData = profile ? JSON.parse(profile) : {};
      const value: number =
        profileData.country !== null ? profileData.country : 1;
      setValue("country", value);
      dispatch(setSelectedCountry(value));
    } else {
      const value: number = 1;
      setValue("country", value);
      dispatch(setSelectedCountry(value));
    }
  };

  const handleOptionClickCountry = (value: number) => {
    dispatch(setSelectedCountry(value));
    dispatch(setClickCountry(false));
    setValue("country", value);
  };

  const handleOptionClickMaritalStatus = (value: number) => {
    dispatch(setSelectedMaritalStatus(value));
    dispatch(setClickMaritalStatus(false));
    setValue("familystatus", value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    reset
  } = useForm<TFormDataPersonalValues>({
    mode: "onTouched",
  });

  const onSubmit = (data: TFormDataPersonalValues) => {
    const dataNew = {...data, date_of_birth: changeDateOfBirth}
    const elements:TFormDataPersonalValues = dataNew;
    let promise = new Promise<TFormDataPersonalValues>((resolve) => {
      let objectData: TFormDataPersonalValues = {};
      for (const key in elements) {
        const keyCurrent = key;
        if (elements[key] !== undefined && elements[key] !== "") {
          objectData[keyCurrent] = elements[keyCurrent];
        } else {
          continue;
        }
      }
      resolve(objectData);
    });
    promise.then((objectData: TFormDataPersonalValues) => {
      editingDataPersonal(objectData)
        .then((data: TUserProfileValues) => {
          localStorage.setItem("updateInfo", JSON.stringify(data));
          dispatch(setName(data.first_name));
          dispatch(setSecondName(data.last_name));
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
    <form
      className={selectedNavDataPersonal ? style.form : style.formHide}
      id='formDataPersonal'
      onSubmit={handleSubmit(onSubmit)}>
      <div className={style.form_container}>
        <div className={style.name_form}>
          <label>
            Имя <span>*</span>
          </label>
          <div
            className={`${errors.first_name ? style.errorInput : style.inputBlock
              }`}>
            <input
              className={errors.first_name ? style.errorInput : ''}
              type='text'
              placeholder='Имя'
              {...register("first_name", {
                required: "Обязательное поле",
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
            <button
              type='button'
              className={style.buttonInput}
              onClick={handleClickResetValueFirstName}></button>
          </div>

          <span className={errors.first_name ? style.error : style.message}>
            {errors?.first_name?.message ||
              "Необходимо для регистрации на мероприятие"}
          </span>
        </div>

        <div className={style.name_form}>
          <label>
            Фамилия <span>*</span>
          </label>
          <div
            className={`${errors.last_name ? style.errorInput : style.inputBlock
              }`}>
            <input
              className={errors.last_name ? style.errorInput : ""}
              type='text'
              placeholder='Фамилия'
              // defaultValue={profileData.last_name}
              {...register("last_name", {
                required: "Обязательное поле",
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
            <button
              type='button'
              className={style.buttonInput}
              onClick={handleClickResetValueLastName}></button>
          </div>
          
          <span
            className={errors.last_name ? style.error : style.message}>
            {errors?.last_name?.message ||
              "Необходимо для регистрации на мероприятие"}
          </span>
        </div>
        <div className={style.container_selectInput}>
          <label>Страна</label>
          <div className={style.countryBlock}>
            <div className={style.countryBlock_select} onClick={handleClickCountry}>
              <span>{countryList && (countryList.find((country: TCountries) => 
                (Number(country.id) === selectedCountry))).name}</span>
            </div>
            {clickCountry && (
              <div className={style.options}>
                {countryList &&
                  countryList.map((country: TCountries) => (
                    <div
                      className={
                        selectedCountry !== Number(country.id)
                          ? style.option
                          : style.optionHide
                      }
                      onClick={() =>
                        handleOptionClickCountry(Number(country.id))
                      }>
                      {country.name}
                    </div>
                  ))}
              </div>
            )}
            <button
              type='button'
              className={style.buttonInput}
              onClick={handleClickResetValueCountry}></button>
          </div>
        </div>
        <div className={style.name_form}>
          <label>Дата рождения</label>
          <SelectDate type='dob' />
        </div>
        <div className={style.container_selectInput}>
          <label>Семейное положение</label>
          <div
            className={style.customSelect}
            onClick={handleClickMaritalStatus}>
            <span>
              {(selectedMaritalStatus === 0 && "Не выбран") ||
                (selectedMaritalStatus === 1 && "Холост / Не замужем") ||
                (selectedMaritalStatus === 2 && "Женат / Замужем") ||
                (selectedMaritalStatus === 3 && "Разведен / Разведена")}
            </span>
            <img src={arrow_down} alt='arrow' />
          </div>
          {clickMaritalStatus && (
            <div className={style.options}>
              <div
                className={
                  selectedMaritalStatus !== 1 ? style.option : style.optionHide
                }
                onClick={() => handleOptionClickMaritalStatus(1)}>
                Холост / Не замужем
              </div>
              <div
                className={
                  selectedMaritalStatus !== 2 ? style.option : style.optionHide
                }
                onClick={() => handleOptionClickMaritalStatus(2)}>
                Женат / Замужем
              </div>
              <div
                className={
                  selectedMaritalStatus !== 3 ? style.option : style.optionHide
                }
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
          className={!isValid ? style.disabled : style.submit}>
          Сохранить
        </button>
      </div>
    </form>
  );
};
