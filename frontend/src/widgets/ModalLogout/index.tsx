import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../app/services/hooks.ts";
import {logoutUser} from "../../app/services/slices/authorizationSlice.ts";
import {ModalWrapper} from "../../shared/ModalWrapper";
import style from "./index.module.scss";

export const ModalLogout: React.FC<{handleCloseMenu?: () => void;}> = ({handleCloseMenu}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation()

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleOpenModalLogout = () => {
    setModalIsOpen(true);
  };
  const handleCloseModal = () => {
    handleCloseMenu && handleCloseMenu();
    setModalIsOpen(false);
  };

  useEffect(() => {
    modalIsOpen && handleCloseModal();
  }, [location]);

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate('/', {replace: true});
  };

  return (
    <>
      <button onClick={handleOpenModalLogout}>Выйти</button>
      <ModalWrapper isOpen={modalIsOpen} handleClose={handleCloseModal}>
        <h2 className={style.title}>Выйти из аккаунта ?</h2>
        <button className={style.buttonLogout} onClick={handleLogout}>Выйти</button>
      </ModalWrapper>
    </>
  );
};
