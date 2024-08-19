import {useMatch} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/services/hooks.ts";
import {closeModalSuccess} from "../../app/services/slices/applyRegistrationSlice";
import {getEventList} from "../../app/services/slices/eventListSlice.ts";
import {ModalWrapper} from "../../shared/ModalWrapper";
import SuccessIcon from "../../app/assets/icons/success.svg?react";
import style from "./index.module.scss";
import {getSliderList} from "../../app/services/slices/sliderSlice.ts";

export const ModalEventRegistrationSuccess = () => {
  const dispatch = useAppDispatch();
  const isMainPage = useMatch('/');
  const isProfileEventsPage = useMatch('/profile/events');
  const {isModalSuccessOpen, eventName} = useAppSelector(state => state.applyRegistration);
  const handleClose = () => {
    dispatch(closeModalSuccess());
    if (isMainPage) {
      dispatch(getEventList());
      dispatch(getSliderList('popular'));
      dispatch(getSliderList('recommended'));
    }
    isProfileEventsPage && dispatch(getSliderList('recommended'));
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
