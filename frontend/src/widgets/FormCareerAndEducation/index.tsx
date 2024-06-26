import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { TFormDataPersonalValues, TUserProfileValues } from "../../app/types/types";
import { editingDataPersonal, getFormProfile } from "../../app/api/api";
import style from "./index.module.scss";
import arrow_down from "../../app/assets/icons/arrow_down.svg";
import { useDispatch, useSelector } from "../../app/types/hooks";
import {
  setClickProfileExperience,
  setSelectedProfileExperience,
  setClickProfileSpecialization,
  setSelectedProfileSpecialization,
  setClickIncome,
  setSelectedIncome,
  setClickEducation,
  setSelectedEducation,
} from "../../app/services/slices/profileSlice";
export const FormCareerAndEducation = () => {
  const dispatch = useDispatch();
  const {
    clickProfileExperience,
    selectedProfileExperience,
    clickProfileSpecialization,
    selectedProfileSpecialization,
    clickIncome,
    selectedIncome,
    clickEducation,
    selectedEducation,
    selectedNavCareerAndEducation,
  } = useSelector((state) => state.profile);
  const { place_of_work, position } = useSelector((state) => state.profile);
  
  React.useEffect(() => {
    if (place_of_work !== "") {
      setValue("place_of_work", place_of_work);
    }
    if(position !== "") {
      setValue("position", position);
    }
  }, []);

  const handleClickProfileExperience = () => {
    dispatch(setClickProfileExperience(!clickProfileExperience));
  };

  const handleClickIncome = () => {
    dispatch(setClickIncome(!clickIncome));
  }

  const handleClickEducation = () => {
    dispatch(setClickEducation(!clickEducation));
  }

  const handleClickProfileSpecialization = () => {
    dispatch(setClickProfileSpecialization(!clickProfileSpecialization));
  }

  const handleOptionClickEducation = (value: number) => {
    dispatch(setSelectedEducation(value));
    dispatch(setClickEducation(false));
    setValue("education", value);
  }

  const handleOptionClickProfileExperience = (value: number) => {
    dispatch(setSelectedProfileExperience(value));
    dispatch(setClickProfileExperience(false));
    setValue("experience", value);
  };

  const handleOptionClickProfileSpecialization = (value: number) => {
    dispatch(setSelectedProfileSpecialization(value));
    dispatch(setClickProfileSpecialization(false));
    setValue("specialization", value);
  }

  const handleOptionClickIncome = (value: number) => {
    dispatch(setSelectedIncome(value));
    dispatch(setClickIncome(false));
    setValue("income", value);
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<TFormDataPersonalValues>({
    mode: "onTouched",
  });

  const onSubmit = (data: TFormDataPersonalValues) => {
    let promise = new Promise<TFormDataPersonalValues>((resolve) => {
      let objectData: TFormDataPersonalValues = {};
      for(const key in data) {
        const keyCurrent = key;
        if(data[key] !== undefined && data[key] !== "") {
          objectData[keyCurrent] = data[keyCurrent];
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
    <form className={selectedNavCareerAndEducation ? style.form : style.formHide} onSubmit={handleSubmit(onSubmit)} id="#formCareerAndEducation">
      <div className={style.form_container}>
        <h3 className={style.form_title}>Карьера и образование</h3>
        <div className={style.name_form}>
          <label>
            Место работы <span>*</span>
          </label>
          <input
            className={errors.place_of_work ? style.errorInput : ''}
            type='text'
            placeholder='Укажите место вашей работы'
            {...register("place_of_work", {
              required: "Обязательное поле",
              minLength: {
                value: 2,
                message: "Слишком короткое название",
              }
            })}
          />
          <span className={errors.place_of_work ? style.error : style.message}>
            {errors?.place_of_work?.message ||
              "Необходимо для регистрации на мероприятие"}
          </span>
        </div>
        <div className={style.name_form}>
          <label>
            Должность <span>*</span>
          </label>
          <input
            className={errors.position ? style.errorInput : ''}
            type='text'
            placeholder='Укажите вашу должность'
            {...register("position", {
              required: "Обязательное поле",
              minLength: {
                value: 2,
                message: "Слишком короткое название",
              }
            })}
          />
          <span className={errors.position ? style.error : style.message}>
            {errors?.position?.message ||
              "Необходимо для регистрации на мероприятие"}
          </span>
        </div>

        <div className={style.container_selectInput}>
          <label>
            Ваш опыт работы <span className={style.star}>*</span>
          </label>
          <div className={style.customSelect} onClick={handleClickProfileExperience}>
            <span>{(selectedProfileExperience === 0 && "Нет выбрано") ||
                   (selectedProfileExperience === 1 && "Нет опыта") ||
                   (selectedProfileExperience === 2 && "От 1 года") ||
                   (selectedProfileExperience === 3 && "От 3 лет") ||
                   (selectedProfileExperience === 4 && "От 5 лет") ||
                   (selectedProfileExperience === 5 && "Другое")
            }</span>
            <img src={arrow_down} alt='arrow' />
          </div>
          <span className={style.message}>
            Необходимо для регистрации на мероприятие
          </span>
          {clickProfileExperience && (
            <div className={style.options}>
              <div
                className={selectedProfileExperience !== 1 ? style.option : style.optionHide}
                onClick={() => handleOptionClickProfileExperience(1)}>
                Нет опыта
              </div>
              <div
                className={selectedProfileExperience !== 2 ? style.option : style.optionHide}
                onClick={() => handleOptionClickProfileExperience(2)}>
                От 1 года
              </div>
              <div
                className={selectedProfileExperience !== 3 ? style.option : style.optionHide}
                onClick={() => handleOptionClickProfileExperience(3)}>
                От 3 лет
              </div>
              <div
                className={selectedProfileExperience !== 4 ? style.option : style.optionHide}
                onClick={() => handleOptionClickProfileExperience(4)}>
                От 5 лет
              </div>
              <div
                className={selectedProfileExperience !== 5 ? style.option : style.optionHide}
                onClick={() => handleOptionClickProfileExperience(5)}>
                Другое
              </div>
            </div>
          )}
        </div>
        <div className={style.container_selectInput}>
          <label>
            Ваше направление <span className={style.star}>*</span>
          </label>
          <div className={style.customSelect} onClick={handleClickProfileSpecialization}>
            <span>{(selectedProfileSpecialization === 0 && "Не выбрано") ||
                   (selectedProfileSpecialization === 1 && "Backend") ||
                   (selectedProfileSpecialization === 2 && "Frontend") ||
                   (selectedProfileSpecialization === 3 && "Mobile") ||
                   (selectedProfileSpecialization === 4 && "QA") ||
                   (selectedProfileSpecialization === 5 && "ML") ||
                   (selectedProfileSpecialization === 6 && "Другое")}</span>
            <img src={arrow_down} alt='arrow' />
          </div>
          <span
            className={style.message}>
            Необходимо для регистрации на мероприятие
          </span>
          {clickProfileSpecialization && (
            <div className={style.options}>
              <div
                className={selectedProfileSpecialization !== 1 ? style.option : style.optionHide}
                onClick={() => handleOptionClickProfileSpecialization(1)}>
                Backend
              </div>
              <div
                className={selectedProfileSpecialization !== 2 ? style.option : style.optionHide}
                onClick={() => handleOptionClickProfileSpecialization(2)}>
                Frontend
              </div>
              <div
                className={selectedProfileSpecialization !== 3 ? style.option : style.optionHide}
                onClick={() => handleOptionClickProfileSpecialization(3)}>
                Mobile
              </div>
              <div
                className={selectedProfileSpecialization !== 4 ? style.option : style.optionHide}
                onClick={() => handleOptionClickProfileSpecialization(4)}>
                QA
              </div>
              <div
                className={selectedProfileSpecialization !== 5 ? style.option : style.optionHide}
                onClick={() => handleOptionClickProfileSpecialization(5)}>
                ML
              </div>
              <div
                className={selectedProfileSpecialization !== 6 ? style.option : style.optionHide}
                onClick={() => handleOptionClickProfileSpecialization(6)}>
                Другое
              </div>
            </div>
          )}
        </div>
        <div className={style.container_selectInput}>
          <label>
            Доход
          </label>
          <div className={style.customSelect} onClick={handleClickIncome}>
            <span>{(selectedIncome === 0 && "Не выбрано") ||
                   (selectedIncome === 1 && "до 50 000 рублей в месяц") ||
                   (selectedIncome === 2 && "50 000 - 100 000 рублей в месяц") ||
                   (selectedIncome === 3 && "100 000 - 150 000 рублей в месяц") ||
                   (selectedIncome === 4 && "150 000 - 200 000 рублей в месяц") ||
                   (selectedIncome === 5 && "Свыше 200 000 рублей в месяц") ||
                   (selectedIncome === 6 && "Другое")}</span>
            <img src={arrow_down} alt='arrow' />
          </div>
          {clickIncome && (
            <div className={style.options}>
              <div
                className={selectedIncome !== 1 ? style.option : style.optionHide}
                onClick={() => handleOptionClickIncome(1)}>
                до 50 000 рублей в месяц
              </div>
              <div
                className={selectedIncome !== 2 ? style.option : style.optionHide}
                onClick={() => handleOptionClickIncome(2)}>
                50 000 - 100 000 рублей в месяц
              </div>
              <div
                className={selectedIncome !== 3 ? style.option : style.optionHiden}
                onClick={() => handleOptionClickIncome(3)}>
                100 000 - 150 000 рублей в месяц
              </div>
              <div
                className={selectedIncome !== 4 ? style.option : style.optionHide}
                onClick={() => handleOptionClickIncome(4)}>
                150 000 - 200 000 рублей в месяц
              </div>
              <div
                className={selectedIncome !== 5 ? style.option : style.optionHide}
                onClick={() => handleOptionClickIncome(5)}>
                Свыше 200 000 рублей в месяц
              </div>
              <div
                className={selectedIncome !== 6 ? style.option : style.optionHide}
                onClick={() => handleOptionClickIncome(6)}>
                Другое
              </div>
            </div>
          )}
        </div>
        <div className={style.container_selectInput}>
          <label>
            Образование
          </label>
          <div className={style.customSelect} onClick={handleClickEducation}>
            <span>{(selectedEducation === 0 && "Не выбрано") ||
                   (selectedEducation === 1 && "Среднее общее образование") ||
                   (selectedEducation === 2 && "Среднее профессиональное образование") ||
                   (selectedEducation === 3 && "Неоконченное высшее") ||
                   (selectedEducation === 4 && "Оконченное высшей бакалавриат/специалитет") ||
                   (selectedEducation === 5 && "Магистратура") ||
                   (selectedEducation === 6 && "Аспирантура") ||
                   (selectedEducation === 7 && "Другое")
                   }</span>
            <img src={arrow_down} alt='arrow' />
          </div>
          {clickEducation && (
            <div className={style.options}>
              <div
                className={selectedEducation !== 1 ? style.option : style.optionHide}
                onClick={() => handleOptionClickEducation(1)}>
                Среднее общее образование
              </div>
              <div
                className={selectedEducation !== 2 ? style.option : style.optionHide}
                onClick={() => handleOptionClickEducation(2)}>
                Среднее профессиональное образование
              </div>
              <div
                className={selectedEducation !== 3 ? style.option : style.optionHide}
                onClick={() => handleOptionClickEducation(3)}>
                Неоконченное высшее
              </div>
              <div
                className={selectedEducation !== 4 ? style.option : style.optionHide}
                onClick={() => handleOptionClickEducation(4)}>
                Оконченное высшей бакалавриат/специалитет
              </div>
              <div
                className={selectedEducation !== 5 ? style.option : style.optionHide}
                onClick={() => handleOptionClickEducation(5)}>
                Магистратура
              </div>
              <div
                className={selectedEducation !== 6 ? style.option : style.optionHiden}
                onClick={() => handleOptionClickEducation(6)}>
                Аспирантура
              </div>
              <div
                className={selectedEducation !== 7 ? style.option : style.optionHide}
                onClick={() => handleOptionClickEducation(7)}>
                Другое
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