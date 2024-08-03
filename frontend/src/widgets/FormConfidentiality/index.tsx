import React from "react";
import {useNavigate} from 'react-router-dom';
import {useForm} from "react-hook-form";
import {TFormConfidentialityValues, TUserProfileValues, TFormDataPersonalValues} from "../../app/types/types";
import {editingDataPersonal, deleteUserProfile} from "../../app/api/api";
import style from "./index.module.scss";
import {useDispatch, useSelector} from "../../app/types/hooks";
import {setPhone} from "../../app/services/slices/profileSlice";
import useProfileState from '../../shared/useProfileState/index';
import {setModalResetPassword} from "../../app/services/slices/resetPasswordSlice.ts";

export const FormConfidentiality = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {resetForm} = useProfileState();
  const {
    phone,
    email,
  } = useSelector((state) => state.profile);

  React.useEffect(() => {
    if (phone !== "") {
      setValue("phone", phone);
    }
  }, []);

  function handleResetPassword() {
    dispatch(setModalResetPassword({open: true, formType: 'profile'}));
  }

  function handleDeleteProfile() {
    deleteUserProfile()
      .then(() => {
        localStorage.removeItem('updateInfo');
        resetForm();
        alert(
          "Данные успешно удалены.",
        );
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        alert("Произошла ошибка при удалении профиля. Попробуйте еще раз позже.");
      })
  }

  const {
    register,
    handleSubmit,
    formState: {errors, isValid},
    setValue,
  } = useForm<TFormConfidentialityValues>({mode: "onTouched"});


  const onSubmit = (data: TFormConfidentialityValues) => {
    let promise = new Promise<TFormDataPersonalValues>((resolve) => {
      let objectData: TFormDataPersonalValues = {};
      const profile = localStorage.getItem("updateInfo");
      const profileData = profile ? JSON.parse(profile) : {};
      for (const key in data) {
        const keyCurrent = key;
        for (const keyData in profileData) {
          const keyProfile = keyData;
          if (data[key] !== profileData[keyProfile]) {
            objectData[keyCurrent] = data[keyCurrent];
          } else {
            continue;
          }
        }
      }
      resolve(objectData);
    })
    promise.then((objectData: TFormDataPersonalValues) => {
      editingDataPersonal(objectData)
        .then((data: TUserProfileValues) => {
          localStorage.setItem("updateInfo", JSON.stringify(data));
          dispatch(setPhone(data.phone));
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
    <section>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)} id="formConfidentiality">
        <div className={style.form_container}>
          <h2 className={style.form_title}>Настройки безопасности</h2>
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

            <span className={style.message}>
              {"Невозможно изменить. Необходимо для регистрации на мероприятие."}
            </span>
          </div>
          <div className={style.name_form}>
            <label className={style.labelPassword}>
              Пароль
            </label>
            <input
              type='password'
              className={style.inputHide}
              placeholder='********'
              disabled
            />

            <button
              type='button'
              className={style.buttonResetPassword}
              onClick={handleResetPassword}>
              Сбросить пароль
            </button>

          </div>
          <div className={style.name_form}>
            <label>
              Номер телефона<span>*</span>
            </label>
            <input
              className={errors.phone ? style.errorInput : ""}
              type='phone'
              placeholder='+79521120101'
              {...register("phone", {
                minLength: {
                  value: 11,
                  message: "Слишком короткий номер телефона. Min = 11.",
                },
                maxLength: {
                  value: 13,
                  message: "Слишком длинный номер телефона. Max = 13.",
                },
                pattern: {
                  value: /^\+?[78][-(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/,
                  message: "Некорректный формат номера телефона. ",
                },
              })}
            />

            <span
              className={`${errors.phone ? style.error : style.message}`}>
              {errors?.phone?.message ||
                "Необходимо для регистрации на мероприятие"}
            </span>
          </div>
        </div>
        <div className={style.buttonBlock}>
          <button
            type='submit'
            className={!isValid ? style.disabled : style.submit}
            disabled={!isValid}
          >
            Сохранить
          </button>
          <button
            type='button'
            className={style.buttonDeleteProfile}
            onClick={handleDeleteProfile}
          >
            Удалить профиль
          </button>
        </div>
      </form>
    </section>
  );
};