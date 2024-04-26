import React, { useState } from "react";
import style from "./index.module.scss";
import { useForm } from "react-hook-form";
import { TFormProfileAvatar, TUserProfileValues } from "../../app/types/types";
import { editingProfileAvatar, getFormProfile } from "../../app/api/api";
import { useDispatch, useSelector } from "../../app/types/hooks";
import closeIcon from "../../app/assets/icons/close_mini.svg";
import {
  setOpenModalAvatar,
} from "../../app/services/slices/formSlice";

export const FormEditAvatar = () => {
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(setOpenModalAvatar(false));
  };
  const {
    openModalAvatar,
  } = useSelector((state) => state.form);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm<TFormProfileAvatar>({
    mode: "onTouched",
  });

  const onSubmit = (data: TFormProfileAvatar) => {
    editingProfileAvatar(data)
      .then(() => {
        getFormProfile()
          .then((data: TUserProfileValues) => {
            localStorage.setItem("updateInfo", JSON.stringify(data));
            alert(
              "Данные успешно обновлены.",
            );
            reset();
            dispatch(setOpenModalAvatar(false));
          })
          .catch((err) => {
            console.log(err);
          })
        })
      .catch((error) => {
        alert("Произошла ошибка при отправке формы. Попробуйте еще раз позже.");
      })
      .finally(() => {
      });
  };

  return (
    <div className={style.container} id="formEditAvatar">
      <section className={style.titleBlock}>
        <img
          src={closeIcon}
          alt='CloseIcon'
          className={style.icon}
          onClick={handleCloseModal}
        />
        <h2 className={style.form_title}>Изменить фотографию</h2>
      </section>
      <form className={style.form} id="formProfileAvatar" onSubmit={handleSubmit(onSubmit)}>
        <div className={style.name_form}>
          <label>
            Url 
          </label>
          <div className={style.inputBlock}>
            <input
              className={`${errors.user_photo ? style.errorInput : style.message}`}
              type='url'
              placeholder='Введите url-адрес картинки'
              {...register("user_photo", {
                pattern: {
                  value: /^https?:\/\/(www\.)?([0-9a-zA-Z.-]+\.)+[a-z]{2,6}(?:\/[^/#?]+)+\.?(?:jpe?g|gif|png|bmp|webp)?$/i,
                  message: "Некорректная ссылка",
                },
              })}
            />
            <span
              className={`${errors.user_photo ? style.error : style.message}`}>
              {errors?.user_photo?.message}
            </span>
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
        </div>
      </form>
    </div>
  );
};