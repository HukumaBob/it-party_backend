import {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import {useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../app/services/hooks.ts";
import {deleteUserProfile, updateUserProfile} from "../../app/services/slices/profileSlice.ts";
import {setModalResetPassword} from "../../app/services/slices/resetPasswordSlice.ts";
import {logoutUser} from "../../app/services/slices/authorizationSlice.ts";
import {ModalWrapper} from "../../shared/ModalWrapper";
import LoadingIcon from "../../app/assets/icons/loading.svg?react";
import ErrorIcon from "../../app/assets/icons/error.svg?react";
import cn from "classnames";
import style from "./index.module.scss";

type TFormData = { "phone": string };

export const FormConfidentiality = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [hasFormChanged, setHasFormChanged] = useState(false);
  const [initialValues, setInitialValues] = useState<TFormData | null>(null);
  const {data, statusGetProfile, statusUpdateProfile, statusDeleteUser} = useAppSelector((state) => state.profile);
  const isLoading = [statusGetProfile, statusUpdateProfile, statusDeleteUser].includes('loading');
  const isError = [statusGetProfile, statusUpdateProfile, statusDeleteUser].includes('error');

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
    watch
  } = useForm<TFormData>({mode: "onTouched"});

  useEffect(() => {
    if (statusGetProfile === 'success') {
      const initialFormValues = {phone: data.phone};
      setInitialValues(initialFormValues);
      reset(initialFormValues);
    }
  }, [statusGetProfile]);

  useEffect(() => {
    const subscription = watch((currentValues) => {
      if (initialValues) {
        const changed = currentValues.phone !== initialValues.phone;
        setHasFormChanged(changed);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, initialValues]);

  const onSubmit = (formData: TFormData) => {
    setInitialValues(formData);
    setHasFormChanged(false);
    dispatch(updateUserProfile(formData))
  };

  const handleResetPassword = () => {
    dispatch(setModalResetPassword({open: true, formType: 'profile'}));
  };

  const [modalConfirmDelete, setModalConfirmDelete] = useState(false);
  const handleOpenModalConfirmDelete = () => {
    setModalConfirmDelete(true);
  };
  const handleCloseModalConfirmDelete = () => {
    setModalConfirmDelete(false);
  };
  const handleDeleteProfile = () => {
    dispatch(deleteUserProfile());
  };
  useEffect(() => {
    if (statusDeleteUser === 'success') {
      dispatch(logoutUser())
      navigate('/', {replace: true});
    }
  }, [statusDeleteUser]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='inputBlock'>
        <h3>Email</h3>
        <input type='email' value={data.email} disabled/>
      </div>

      <div className='inputBlock mt-lg'>
        <h3>Пароль</h3>
        <input type='password' placeholder='***********' disabled/>
      </div>

      <button
        className={style.buttonResetPassword}
        type='button'
        onClick={handleResetPassword}
      >
        Сбросить пароль
      </button>

      <div className='inputBlock mt-sm'>
        <h3>Номер телефона</h3>
        <input
          className={cn({'error': errors.phone})}
          type='phone'
          placeholder='+78005550022'
          {...register("phone", {
            minLength: {
              value: 11,
              message: "слишком короткий номер, min = 11",
            },
            maxLength: {
              value: 13,
              message: "слишком длинный номер телефона, max = 13",
            },
            pattern: {
              value: /^\+?[78][-(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/,
              message: "некорректный формат номера",
            },
          })}
        />
        <span className='errorMessage'>
          {errors?.phone?.message}&nbsp;
        </span>
      </div>

      <div className={style.buttonsBlock}>
        <button className='buttonProfileSubmit' type='submit' disabled={!hasFormChanged}>
          Сохранить
        </button>

        <button type='button' className={style.buttonDeleteProfile} onClick={handleOpenModalConfirmDelete}>
          Удалить профиль
        </button>
      </div>

      <ModalWrapper isOpen={modalConfirmDelete} handleClose={handleCloseModalConfirmDelete}>
        <h2 className={style.titleConfirm}>Удалить профиль ?</h2>
        <button className={style.buttonConfirm} onClick={handleDeleteProfile}>Удалить</button>
      </ModalWrapper>

      <div className={cn('modalLoadingErrorMessage', {'visible': isLoading || isError})}>
        {isLoading && <LoadingIcon/>}
        {isError && <ErrorIcon/>}
      </div>
    </form>
  );
};
