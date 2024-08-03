import React from "react";
import style from "./index.module.scss";
import { useForm } from "react-hook-form";
import { resetPassword } from "../../app/api/api";
import { useDispatch, useSelector } from "../../app/types/hooks";
import closeIcon from "../../app/assets/icons/close_mini.svg";
import { TFormResetPassword, TFormPassword } from "../../app/types/types";
import Preloader from "../../shared/Preloader";
import {
  setOpenModalResetPassword,
  setEmail,
  setResetOk,
} from "../../app/services/slices/profileSlice";

export const FormResetPassword = ({ id }: TFormPassword) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState<boolean>(false);
  const handleCloseModal = () => {
    dispatch(setOpenModalResetPassword(false));
  };

  const {
    email,
  } = useSelector((state) => state.profile);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<TFormResetPassword>({
    mode: "onTouched",
  });

  const onSubmit = (data: TFormResetPassword ) => {
    setLoading(true);
    if(id === "resetPasswordProfile") {
      data = {email: email};
    };
    if(id === "resetPasswordAuthorization") {
      dispatch(setEmail(data.email));
    };   
    resetPassword(data)
      .then(() => {
        setLoading(false);
        dispatch(setResetOk(true));  
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
    <div className={style.container} id="formForgottenPassword">
      <form className={style.form} id="formResetPassword" onSubmit={handleSubmit(onSubmit)}>
        <div className={style.titleBlock}>
          <img
            src={closeIcon}
            alt='CloseIcon'
            className={style.icon}
            onClick={handleCloseModal}
          />
          <h2 className={style.form_title}>Не помню пароль</h2>
          <p className={style.form_subtitle}>{(id === "resetPasswordProfile") ? 'Нажмите на кнопку "Сбросить пароль"' : 'Введите ваш e-mail в поле ниже, чтобы сбросить пароль'}</p>
        </div>
        {(id === "resetPasswordProfile") && (
          <div className={style.name_form}>
            <label>
              Email <span>*</span>
            </label>
            <input
              type='email'
              className={style.inputHide}
              value={email}
              disabled
            />
          </div>
        )}
        {(id === "resetPasswordAuthorization") && (
          <div className={style.name_form}>
            <label>
              Email
            </label>
            <input
              className={errors.email ? style.errorInput : ""}
              type='email'
              placeholder='email@list.ru'
              {...register("email", {
                pattern: {
                  value: /^[A-ZА-Я0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message:
                    "Формат email неверный.",
                },
              })}
            />
            <span className={errors.email ? style.error : ""}>
              {errors?.email?.message}
            </span>
          </div>
        )}
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
            {loading ? <Preloader /> : "Сбросить пароль"}
          </button>
        </div>
      </form>
    </div>
  );
};