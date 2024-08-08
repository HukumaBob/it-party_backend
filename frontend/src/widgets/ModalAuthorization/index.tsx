import {useAppDispatch, useAppSelector} from "../../app/services/hooks.ts";
import {setOpenAuthorizationModal} from "../../app/services/slices/authorizationSlice.ts";
import {FormAuthorization} from "../FormAuthorization";
import {ModalWrapper} from "../../shared/ModalWrapper";
import LogoIcon from "../../app/assets/icons/logo_text.svg?react";

export const ModalAuthorization = () => {
  const dispatch = useAppDispatch();
  const {modalIsOpen} = useAppSelector(state => state.authorization);
  const handleClose = () => {
    dispatch(setOpenAuthorizationModal(false));
  };

  return (
    <ModalWrapper isOpen={modalIsOpen} handleClose={handleClose} Icon={LogoIcon}>
      <FormAuthorization/>
    </ModalWrapper>
  );
};
