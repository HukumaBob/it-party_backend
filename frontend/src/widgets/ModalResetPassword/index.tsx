import {useEffect} from "react";
import Modal from "@mui/material/Modal";
import {useSelector, useDispatch} from "../../app/types/hooks";
import {resetStatus, setModalResetPassword} from "../../app/services/slices/resetPasswordSlice.ts";
import {FormResetPassword} from "../../shared/FormResetPassword";
import ErrorIcon from "../../app/assets/icons/error.svg?react";
import LoadingIcon from "../../app/assets/icons/loading.svg?react";
import CloseIcon from "../../app/assets/icons/close.svg?react";
import cn from "classnames";
import style from "./index.module.scss";

export const ModalResetPassword = () => {
  const dispatch = useDispatch();
  const {
    loading,
    error,
    status,
    email,
    formType,
    modalIsOpen
  } = useSelector(state => state.resetPassword);

  const handleCloseModal = () => {
    dispatch(setModalResetPassword({open: false}));
  };
  useEffect(() => () => {
    dispatch(resetStatus())
  }, [dispatch]);

  return (
    <Modal
      open={modalIsOpen}
      onClose={handleCloseModal}
      aria-labelledby="modal-reset-password"
      aria-describedby="modal-user-reset-password"
      sx={{
        display: 'grid',
        placeItems: 'center',
        '.MuiBackdrop-root': {backdropFilter: 'blur(3px)'}
      }}
    >
      <div className={style.wrapper}>
        <div className={style.container}>
          <button className={style.buttonClose} type='button' onClick={handleCloseModal}>
            <CloseIcon/>
          </button>
          {!status && <h2 className={style.title}>Не помню пароль</h2>}
          {status !== 'success' &&
            <p className={style.subtitle}>
              {formType === 'profile' &&
                <div>Нажмите на кнопку "Сбросить пароль"
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>}
              {formType === 'authorization' && 'Введите ваш e-mail в поле ниже, чтобы сбросить пароль'}
            </p>
          }
          {loading && <LoadingIcon className={cn('loading-error-icon', style.loadingErrorIcon)}/>}
          {error && <ErrorIcon className={cn('loading-error-icon', style.loadingErrorIcon)}/>}
          {status !== 'success' && !loading && !error && <FormResetPassword/>}
          {status === 'success' &&
            <div className={style.successContainer}>
              <p>Мы отправили письмо вам на почту.</p>
              <p>Перейдите по ссылке в письме чтобы сбросить пароль.</p>
              <p>Письмо отправлено на&nbsp; <span>{email}</span></p>
              <button onClick={handleCloseModal}>
                Готово
              </button>
            </div>
          }
        </div>
      </div>
    </Modal>
  );
};
