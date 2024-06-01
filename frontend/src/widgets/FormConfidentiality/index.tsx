import React from "react";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { TFormConfidentialityValues, TUserProfileValues, TFormDataPersonalValues } from "../../app/types/types";
import { editingDataPersonal, deleteUserProfile } from "../../app/api/api";
import style from "./index.module.scss";
import eyeSlashedIcon from "../../app/assets/icons/eye-slashed.svg";
import eyeIcon from "../../app/assets/icons/eye.svg";
import { useDispatch, useSelector } from "../../app/types/hooks";
import {
  setPhone,
  setShowPassword,
  setShowPasswordConfirm,
} from "../../app/services/slices/profileSlice";
import useProfileState from '../../shared/useProfileState/index';

export const FormConfidentiality = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [passwordNew, setPasswordNew] = React.useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = React.useState<string>("");
  const { resetForm } = useProfileState();
  const {
    phone,
    email,
    selectedNavConfidentiality,
    showPassword,
    showPasswordConfirm,
  } = useSelector((state) => state.profile);

  React.useEffect(() => {
    if (phone !== "") {
      setValue("phone", phone);
    };
  }, []);
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
  const handleClick = () => {
    dispatch(setShowPassword(!showPassword));
  };
  const handleClickConfirm = () => {
    dispatch(setShowPasswordConfirm(!showPasswordConfirm));
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setValue,
  } = useForm<TFormConfidentialityValues>({
    mode: "onTouched",
  });

  React.useEffect(() => {
    const checkPassword = () => {
      const passwordUserNew = getValues("password");
      const passwordUserNewConfirm = getValues("password_confirm");
      if(passwordUserNew !== undefined && passwordUserNew !== "") {
        setPasswordNew(passwordUserNew);
      };
      if(passwordUserNewConfirm !== undefined && passwordUserNewConfirm !== "") {
        setPasswordConfirm(passwordUserNewConfirm);
      };
    }
    checkPassword();
  }, []);

  React.useEffect(() => {
    const checkPasswords = () => {
      if(passwordNew !== undefined && passwordNew !== "" && passwordConfirm !== undefined && passwordConfirm !== "") {
        if(passwordConfirm !== passwordNew) {
          errors.password_confirm = {type:"", message:""};
          errors.password_confirm.message = "Пароли не совпадают";
        }
      };
    }
    checkPasswords();
  }, [passwordNew, passwordConfirm]);

  const onSubmit = (data: TFormConfidentialityValues) => {
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
    <form className={selectedNavConfidentiality ? style.form : style.formHide} onSubmit={handleSubmit(onSubmit)} id="formConfidentiality">
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
            {"Невозможно изменить. Необходимо для регистрации на мероприятие."}
          </span>
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
            className={`${errors.phone? style.error : style.message}`}>
            {errors?.phone?.message ||
              "Необходимо для регистрации на мероприятие"}
          </span>
        </div>
      </div>
      <div className={style.name_form}>
        <label className={style.labelPassword}>Введите новый пароль</label>
        <label
          className={`${
            errors.password_confirm ? style.eyeIconWithError : style.eyeIcon
          }`}
          onClick={handleClick}>
          {showPassword ? (
            <img src={eyeSlashedIcon} alt='eyeSlashedIcon' />
          ) : (
            <img src={eyeIcon} alt='eyeIcon' />
          )}
        </label>
        <input
          type={`${showPassword ? "text" : "password"}`}
          className={`${
            errors.password ? style.errorInput : style.input
          }`}
          placeholder='********'
          {...register("password", {
            minLength: {
              value: 8,
              message: "Слишком короткий пароль",
            },
            pattern: {
              value: /^(?=.*[A-ZА-Я])(?=.*\d)[A-Za-zА-Яа-я\d._%+-]{8,}$/i,
              message:
                "Пароль должен содержать минимум 1 цифру или букву",
            },
          })}
        />
        <span className={errors.password ? style.error : ""}>
          {errors?.password?.message}
        </span>
      </div>
      <div className={style.name_form}>
        <label className={style.labelPassword}>Повторите пароль</label>
        <label
          className={`${
            errors.password_confirm ? style.eyeIconWithError : style.eyeIcon
          }`}
          onClick={handleClickConfirm}>
          {showPasswordConfirm ? (
            <img src={eyeSlashedIcon} alt='eyeSlashedIcon' />
          ) : (
            <img src={eyeIcon} alt='eyeIcon' />
          )}
        </label>
        <input
          type={`${showPasswordConfirm ? "text" : "password"}`}
          className={`${
            errors.password_confirm ? style.errorInput : style.input
          }`}
          placeholder='********'
          {...register("password_confirm", {
            pattern: {
              value: /^(?=.*[A-ZА-Я])(?=.*\d)[A-Za-zА-Яа-я\d._%+-]{8,}$/i,
              message:
                "Пароль должен содержать минимум 1 цифру или букву",
            },
          })}
        />
        <span className={errors.password_confirm ? style.error : ""}>
          {errors?.password_confirm?.message}
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
        <button
          type='button'
          className={style.submit_deleteProfile}
          onClick={handleDeleteProfile}
        >
          Удалить профиль
        </button>
      </div>
    </form>
  );
};