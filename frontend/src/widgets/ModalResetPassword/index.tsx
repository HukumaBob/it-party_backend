import {useSelector, useDispatch} from "../../app/types/hooks";
import {setModalResetPassword} from "../../app/services/slices/resetPasswordSlice.ts";
import {FormResetPassword} from "../../shared/FormResetPassword";
import {ModalWrapper} from "../../shared/ModalWrapper";
import ErrorIcon from "../../app/assets/icons/error.svg?react";
import LoadingIcon from "../../app/assets/icons/loading.svg?react";
import cn from "classnames";
import style from "./index.module.scss";

export const ModalResetPassword = () => {
  const dispatch = useDispatch();
  const {status, email, formType, modalIsOpen} = useSelector(state => state.resetPassword);
  const handleCloseModal = () => {
    dispatch(setModalResetPassword({open: false}));
  };

  return (
    <ModalWrapper isOpen={modalIsOpen} handleClose={handleCloseModal}>
      {status === 'success' ? (
        <div className={style.successContainer}>
          <p>Мы отправили письмо вам на почту.</p>
          <p>Перейдите по ссылке в письме чтобы сбросить пароль.</p>
          <p>Письмо отправлено на&nbsp; <span>{email}vasia_pupkin@gmail.com</span></p>
          <button onClick={handleCloseModal}>
            Готово
          </button>
        </div>
      ) : (
        <>
          <h2 className={style.title}>Не помню пароль</h2>
          <p className={style.subtitle}>
            {formType === 'profile' && 'Нажмите на кнопку "Сбросить пароль"'}
            {formType === 'authorization' && 'Введите ваш e-mail в поле ниже, чтобы сбросить пароль'}
          </p>
          <FormResetPassword/>
        </>)
      }

      <div className={cn('modalLoadingErrorMessage', {'visible': status === 'loading' || status === 'error'})}>
        {status === 'loading' && <LoadingIcon/>}
        {status === 'error' && <ErrorIcon/>}
      </div>
    </ModalWrapper>
  );
};
