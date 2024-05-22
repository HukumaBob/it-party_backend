import React, { useState } from "react";
import style from "./index.module.scss";
import { useForm } from "react-hook-form";
import { TFormDataPersonalValues, TUserProfileValues, TFormEditAvatar } from "../../app/types/types";
import { editingDataPersonal, getFormProfile } from "../../app/api/api";
import { useDispatch, useSelector } from "../../app/types/hooks";
import closeIcon from "../../app/assets/icons/close_mini.svg";
import { errorDownloadImage } from "../../app/api/constants";
import {
  setOpenModalAvatar,
  setAvatar
} from "../../app/services/slices/profileSlice";

export const FormEditAvatar = () => {
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(setOpenModalAvatar(false));
  };
  const {
    openModalAvatar,
  } = useSelector((state) => state.profile);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm<TFormEditAvatar>({
    mode: "onTouched",
  });

  function getBase64(item: File) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(item);
      reader.onload = function () {
        const result:string = String(reader.result ? reader.result : "")
        resolve(result)
      };
      reader.onerror = () => {
        reject(new Error(errorDownloadImage))
      }
    })
  }

  const onSubmit = (data: TFormEditAvatar ) => {
    let promise = new Promise<string>((resolve) => {
      const fileBase64 = getBase64(data.user_photo[0]);
      resolve(fileBase64);
    })
    promise.then((data) => {
      const dataNew:TFormDataPersonalValues = {user_photo: data};
      editingDataPersonal(dataNew)
      .then((data: TUserProfileValues) => {
        localStorage.setItem("updateInfo", JSON.stringify(data));
        dispatch(setAvatar(data.user_photo));
        alert(
          "Данные успешно обновлены.",
        );
        handleCloseModal(); 
      })
      .catch((error) => {
        console.log(error);
        alert("Произошла ошибка при отправке формы. Попробуйте еще раз позже."); 
      })
      .finally(() => {
        reset();
      });
    })
  };

  return (
    <div className={style.container} id="formEditAvatar">
      <form className={style.form} id="formProfileAvatar" onSubmit={handleSubmit(onSubmit)}>
        <div className={style.titleBlock}>
          <img
            src={closeIcon}
            alt='CloseIcon'
            className={style.icon}
            onClick={handleCloseModal}
          />
          <h2 className={style.form_title}>Изменить фотографию</h2>
        </div>
        <div className={style.name_form}>
          <label>
            Аватар 
          </label>
          <div className={style.inputBlock}>
            <input
              className={`${errors.user_photo ? style.errorInput : style.message}`}
              type='file'
              placeholder='Выберите файл для загрузки'
              accept="image/*"
              {...register("user_photo", {
                required: "Обязательное поле",
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