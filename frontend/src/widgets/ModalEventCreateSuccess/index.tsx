import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAppSelector} from "../../app/services/hooks.ts";
import {ModalWrapper} from "../../shared/ModalWrapper";
import SuccessIcon from "../../app/assets/icons/success.svg?react";
import style from "./index.module.scss";

type TProps = {
  modalSuccessIsOpen: boolean;
  setModalSuccessIsOpen: (value: boolean) => void;
};

export const ModalEventCreateSuccess: React.FC<TProps> = ({modalSuccessIsOpen, setModalSuccessIsOpen}) => {
  const navigate = useNavigate();
  const eventId = useAppSelector(state => state.adminEditEvent.data.id);

  const handleCloseModal = () => {
    setModalSuccessIsOpen(false);
    navigate(`/admin/event/${eventId}`, {replace: true});
  };

  return (
    <ModalWrapper isOpen={modalSuccessIsOpen} handleClose={handleCloseModal} width={600}>
      <SuccessIcon className={style.icon}/>
      <h2 className={style.title}>Новый ивент успешно создан</h2>
      <div className={style.buttonsBlock}>
        <Link to='/admin'>На страницу ивентов</Link>
        <button onClick={handleCloseModal}>Редактировать</button>
      </div>
    </ModalWrapper>
  );
};
