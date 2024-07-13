import React from "react";
import style from "./index.module.scss";
import { useForm } from "react-hook-form";
import { TUserProfileValues, TFormEditAvatar } from "../../app/types/types";
import { editingAvatar } from "../../app/api/api";
import { useDispatch } from "../../app/types/hooks";
import closeIcon from "../../app/assets/icons/close_mini.svg";
import {
  setOpenModalAvatar,
  setAvatar
} from "../../app/services/slices/profileSlice";

export const FormEditAvatar = () => {
  const dispatch = useDispatch();
  const avatarStorage = "http://localhost:8000";
  const handleCloseModal = () => {
    dispatch(setOpenModalAvatar(false));
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<TFormEditAvatar>({
    mode: "onTouched",
  });

  const onSubmit = (data: TFormEditAvatar ) => {
    editingAvatar(data)
      .then((data: TUserProfileValues) => {
        localStorage.setItem("updateInfo", JSON.stringify(data));
        dispatch(setAvatar((`${avatarStorage}${data.user_photo}`)));
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