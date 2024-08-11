import {useAppDispatch, useAppSelector} from "../../app/services/hooks.ts";
import {resendActivation, setOpenAuthorizationSuccessModal} from "../../app/services/slices/authorizationSlice.ts";
import {ModalWrapper} from "../../shared/ModalWrapper/";
import ErrorIcon from "../../app/assets/icons/error.svg?react";
import LoadingIcon from "../../app/assets/icons/loading.svg?react";
import SuccessIcon from "../../app/assets/icons/success.svg?react";
import cn from "classnames";
import style from "./index.module.scss";

export const ModalAuthorizationSuccess = () => {
  const dispatch = useAppDispatch();
  const {
    userEmail,
    modalAuthorizationSuccessIsOpen,
    createUserIsExist,
    statusResendActivation
  } = useAppSelector(state => state.authorization);

  const handleCloseModal = () => {
    dispatch(setOpenAuthorizationSuccessModal(false));
  };
  const handleResendActivation = () => {
    dispatch(resendActivation());
  }

  return (
    <ModalWrapper
      isOpen={modalAuthorizationSuccessIsOpen}
      handleClose={handleCloseModal}
    >
      <h2 className={style.title}>Регистрация</h2>
      <p className={style.paragraph}>
        Мы отправили письмо вам на почту. Перейдите по ссылке чтобы активировать аккаунт.
      </p>
      <p className={style.paragraph}>
        Письмо отправлено на
      </p>
      <div className={style.linkBlock}>
        <a href={`mailto:${userEmail}`} target='_blank' rel="noopener noreferrer">
          {userEmail}
        </a>
      </div>
      <button className={style.button} onClick={handleCloseModal}>Готово</button>
      {createUserIsExist && statusResendActivation !== 'success' && (
        <button
          className={cn(style.button, style.buttonOutlined)}
          onClick={handleResendActivation}
        >
          Выслать еще раз
        </button>
      )}
      {statusResendActivation === 'success' && <SuccessIcon className={style.successIcon}/>}
      <div
        className={cn('modalLoadingErrorMessage', {'visible': statusResendActivation === 'loading' || statusResendActivation === 'error'})}>
        {statusResendActivation === 'loading' && <LoadingIcon/>}
        {statusResendActivation === 'error' && <ErrorIcon/>}
      </div>
    </ModalWrapper>
  );
};
