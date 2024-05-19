import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  TFormDataPersonalValues,
  TUserProfileValues,
  getItem,
  TListCountry,
  TCountries,
} from "../../app/types/types";
import {
  editingDataPersonal,
  getFormProfile,
  getUserProfile,
  postUserProfile,
  getListCountry,
} from "../../app/api/api";
import style from "./index.module.scss";
import { SelectDate } from "../../shared/selectDate/index";
import arrow_down from "../../app/assets/icons/arrow_down.svg";
import { useDispatch, useSelector } from "../../app/types/hooks";
import {
  setClickMaritalStatus,
  setSelectedMaritalStatus,
  setClickCountry,
  setSelectedCountry,
  setChangeDateOfBirth,
} from "../../app/services/slices/formSlice";
import { setName, setSecondName } from "../../app/services/slices/profileSlice";
export const FormDataPersonal = () => {
  const countriesStorage = localStorage.getItem("countries");
  const countryList = countriesStorage && JSON.parse(countriesStorage);
  const profileStorage = localStorage.getItem("updateInfo");
  const dispatch = useDispatch();
  const {
    selectedMaritalStatus,
    clickMaritalStatus,
    selectedNavDataPersonal,
    changeDateOfBirth,
    clickCountry,
    selectedCountry,
  } = useSelector((state) => state.form);
  const profile = localStorage.getItem("updateInfo");
  if (profile) {
    const profileData = JSON.parse(profile!);
    dispatch(setSecondName(profileData.last_name));
    dispatch(setName(profileData.first_name));
  }
  useEffect(() => {
    const tokenCheck = () => {
      const accessToken = localStorage.getItem("accessToken");
      const profile = localStorage.getItem("updateInfo");
      const listCountry = localStorage.getItem("countries");
      if (accessToken) {
        if (profile === undefined || profile === null) {
          getUserProfile()
            .then((data: TUserProfileValues) => {
              localStorage.setItem("updateInfo", JSON.stringify(data));
              if (data.country !== null) {
                setValue("country", data.country);
                dispatch(setSelectedCountry(data.country));
              }
              if (data.first_name !== null) {
                setValue("first_name", data.first_name);
              }
              if (data.last_name !== null) {
                setValue("last_name", data.last_name);
              }
              if (data.date_of_birth !== "") {
                setChangeDateOfBirth(data.date_of_birth);
              }
              if (data.familystatus !== null) {
                setValue("familystatus", data.familystatus);
                dispatch(setSelectedMaritalStatus(data.familystatus));
              }
            })
            .catch((err) => {
              postUserProfile()
                .then((data: TUserProfileValues) => {
                  localStorage.setItem("updateInfo", JSON.stringify(data));
                })
                .catch((err) => {
                  console.log(err);
                });
            });
        }
        if (listCountry === undefined || listCountry === null) {
          getListCountry()
            .then((data: TListCountry) => {
              localStorage.setItem("countries", JSON.stringify(data.results));
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    };
    tokenCheck();
  }, []);

  useEffect(() => {
    const profileStorage = localStorage.getItem("updateInfo");
    const countriesStorage = localStorage.getItem("countries");
    if (profileStorage === undefined || countriesStorage === undefined) {
      Promise.all([
        profileStorage === undefined && getUserProfile(),
        countriesStorage === undefined && getListCountry(),
      ])
        .then(([profile, countries]) => {
          if (profile) {
            localStorage.setItem("updateInfo", JSON.stringify(profile));
            if (profile.country !== null) {
              setValue("country", profile.country);
              dispatch(setSelectedCountry(profile.country));
            }
            if (profile.first_name !== null) {
              setValue("first_name", profile.first_name);
            }
            if (profile.last_name !== null) {
              setValue("last_name", profile.last_name);
            }
            if (profile.date_of_birth !== "") {
              setChangeDateOfBirth(profile.date_of_birth);
            }
            if (profile.familystatus !== null) {
              setValue("familystatus", profile.familystatus);
              dispatch(setSelectedMaritalStatus(profile.familystatus));
            }
          }
          if (countries) {
            localStorage.setItem(
              "countries",
              JSON.stringify(countries.results),
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [profileStorage, countriesStorage]);

  const handleClickMaritalStatus = () => {
    dispatch(setClickMaritalStatus(!clickMaritalStatus));
  };

  const handleClickCountry = () => {
    dispatch(setClickCountry(!clickCountry));
  };

  const handleClickResetValueFirstName = () => {
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

  /*const schemaDataPersonal = yup.object().shape({
    first_name: yup.string(),
    last_name: yup.string(),
    date_of_birth: yup.string(),
    familystatus: yup.number(),
    country: yup.number(),
  });*/

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<TFormDataPersonalValues>({
    mode: "onTouched" /*resolver: yupResolver(schemaDataPersonal),*/,
  });

  const onSubmit = (data: TFormDataPersonalValues) => {
    console.log(errors, isValid);
    const dataNew = { ...data, date_of_birth: changeDateOfBirth };
    const elements: TFormDataPersonalValues = dataNew;
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
          alert("Данные успешно обновлены.");
        })
        .catch((error) => {
          console.log(error);
          alert(
            "Произошла ошибка при отправке формы. Попробуйте еще раз позже.",
          );
        });
    });
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
            className={`${
              errors.first_name ? style.errorInput : style.inputBlock
            }`}>
            <input
              className={`${errors.first_name ? style.errorInput : ""}`}
              type='text'
              placeholder='Имя'
              // defaultValue={profileData.first_name}
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

          <span
            className={`${errors.first_name ? style.error : style.message}`}>
            {errors?.first_name?.message ||
              "Необходимо для регистрации на мероприятие"}
          </span>
        </div>

        <div className={style.name_form}>
          <label>
            Фамилия <span>*</span>
          </label>
          <div
            className={`${
              errors.last_name ? style.errorInput : style.inputBlock
            }`}>
            <input
              className={`${errors.last_name ? style.errorInput : ""}`}
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

          <span className={`${errors.last_name ? style.error : style.message}`}>
            {errors?.last_name?.message ||
              "Необходимо для регистрации на мероприятие"}
          </span>
        </div>
        <div className={style.container_selectInput}>
          <label>Страна</label>
          <div className={style.countryBlock}>
            <div
              className={style.countryBlock_select}
              onClick={handleClickCountry}>
              <span>
                {countryList &&
                  countryList.find(
                    (country: TCountries) =>
                      Number(country.id) === selectedCountry,
                  ).name}
              </span>
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
          <SelectDate id='2' />
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
