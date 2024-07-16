import {useEffect, useState} from "react";
import Modal from '@mui/material/Modal';
import {useSelector} from "../../app/types/hooks";
import {ContainerFormRegistration} from "../../features/ContainerFormRegistration";
import {ReactComponent as CloseIcon} from "../../app/assets/icons/close.svg";
import style from "./index.module.scss";

export const ModalRegistration = ({id}: { id: number }) => {
  const isOpenModalSuccess = useSelector(state => state.applyRegistration.isOpenModalSuccess)
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => {
    setOpen(true);
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
