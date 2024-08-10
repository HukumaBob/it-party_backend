import React from "react";
import {useEffect, useState} from "react";
import Modal from '@mui/material/Modal';
import dayjs from "dayjs";
import {useAppSelector, useAppDispatch} from "../../app/services/hooks.ts";
import {ContainerFormRegistration} from "../../features/ContainerFormRegistration";
import {setOpenAuthorizationModal} from "../../app/services/slices/authorizationSlice.ts";
import CloseIcon from "../../app/assets/icons/close.svg?react";
import cn from "classnames";
import style from "./index.module.scss";

type TProps = {
  id: number;
  name: string;
  status: string;
  date: string;
  time: string;
};

export const ModalEventRegistration: React.FC<TProps> = ({id, name, status, date, time}) => {
  const dispatch = useAppDispatch();
  const isOpenModalSuccess = useAppSelector(state => state.applyRegistration.isModalSuccessOpen)
  const {isAuthorized} = useAppSelector(state => state.authorization)
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => {
    if (!isAuthorized) {
      dispatch(setOpenAuthorizationModal(true));
    } else {
      setOpen(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    isOpenModalSuccess && setOpen(false)
  }, [isOpenModalSuccess]);

  const finalized = dayjs(`${date} ${time}`).isBefore(dayjs())
  if (finalized) {
    status = 'finalized';
  }

  return (
    <div>
      {
        {
          not_applied: <button className={style.registerButton} onClick={handleOpen}>Зарегистрироваться</button>,
          is_favorite: <button className={style.registerButton} onClick={handleOpen}>Зарегистрироваться</button>,
          pending: <div className={cn(style.notification, style.pending)}>Ожидает подтверждения</div>,
          approved: <div className={cn(style.notification, style.approved)}>Билет</div>,
          rejected: <div className={cn(style.notification, style.rejected)}>Отклонено</div>,
          finalized: <div className={cn(style.notification, style.finalized)}>Мероприятие завершено</div>,
        }[status]
      }

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={style.modal}>
          <button className={style.closeButton} onClick={handleClose}>
            <CloseIcon/>
          </button>

          <div className={style.container}>
            <h2 className={style.title}>Регистрация на Cloud Security Meetup</h2>
            <p className={style.description}>
              Для регистрации на ивент необходимо заполнить эту форму и дождаться
              ответа по статусу вашей заявки. Эти данные помогут нам идентифицировать вас на мероприятии.
              Пожалуйста, заполните поля имя и фамилию кириллицей.
            </p>

            <ContainerFormRegistration id={id} name={name}/>
          </div>
        </div>
      </Modal>
    </div>
  );
};
