import React, {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../app/services/hooks.ts";
import {logoutUser} from "../../app/services/slices/authorizationSlice.ts";
import {ModalWrapper} from "../../shared/ModalWrapper";
import style from "./index.module.scss";

type TProps = {
  isOpen: boolean;
  handleClose: () => void;
};

export const ModalLogout: React.FC<TProps> = ({isOpen, handleClose}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation()

  useEffect(() => {
    isOpen && handleClose();
  }, [location]);

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate('/', {replace: true});
  };

  return (
    <ModalWrapper isOpen={isOpen} handleClose={handleClose}>
      <h2 className={style.title}>Выйти из аккаунта ?</h2>
      <button className={style.buttonLogout} onClick={handleLogout}>Выйти</button>
    </ModalWrapper>
  );
};
