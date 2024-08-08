import {useEffect, useState} from "react";
import Modal from '@mui/material/Modal';
import {useAppSelector, useAppDispatch} from "../../app/services/hooks.ts";
import {ContainerFormRegistration} from "../../features/ContainerFormRegistration";
import {setOpenAuthorizationModal} from "../../app/services/slices/authorizationSlice.ts";
import CloseIcon from "../../app/assets/icons/close.svg?react";
import style from "./index.module.scss";

export const ModalEventRegistration = ({id}: { id: number }) => {
  const dispatch = useAppDispatch();
  const isOpenModalSuccess = useAppSelector(state => state.applyRegistration.isOpenModalSuccess)
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

  return (
    <div>
      <button className={style.registerButton} onClick={handleOpen}>
        Зарегистрироваться
      </button>

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

            <ContainerFormRegistration id={id}/>
          </div>
        </div>
      </Modal>
    </div>
  );
};
