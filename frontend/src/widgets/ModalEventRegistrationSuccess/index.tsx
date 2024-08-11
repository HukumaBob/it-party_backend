import {useAppDispatch, useAppSelector} from "../../app/services/hooks.ts";
import {closeModalSuccess} from "../../app/services/slices/applyRegistrationSlice";
import {ModalWrapper} from "../../shared/ModalWrapper";
import SuccessIcon from "../../app/assets/icons/success.svg?react";
import style from "./index.module.scss";

export const ModalEventRegistrationSuccess = () => {
  const dispatch = useAppDispatch();
  const {isModalSuccessOpen, eventName} = useAppSelector(state => state.applyRegistration);
  const handleClose = () => {
    dispatch(closeModalSuccess());
  };

  return (
    <ModalWrapper isOpen={isModalSuccessOpen} handleClose={handleClose} width={880}>
      <div className={style.container}>
        <h2>Ваша заявка на {eventName} отправлена</h2>
        <SuccessIcon/>
        <p>Ожидайте ответа по заявке в течение 1-2 дней</p>
        <button onClick={handleClose}>Закрыть</button>
      </div>
    </ModalWrapper>
  );
};
