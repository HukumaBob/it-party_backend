import Modal from "@mui/material/Modal";
import {useDispatch, useSelector} from "../../app/types/hooks";
import {setOpenModal} from "../../app/services/slices/authorization";
import {FormAuthorization} from "../FormAuthorization";
import LogoIcon from "../../app/assets/icons/logo_text.svg?react";
import style from "./index.module.scss";

export const ModalAuthorization = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(state => state.authorization.openModal);
  const handleClose = () => {
    dispatch(setOpenModal(false));
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-authorization"
      aria-describedby="modal-user-authorization"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '.MuiBackdrop-root': {backdropFilter: 'blur(3px)'}
      }}>
      <div className={style.container}>
        <LogoIcon className={style.logo}/>
        <FormAuthorization/>
      </div>
    </Modal>
  );
};

