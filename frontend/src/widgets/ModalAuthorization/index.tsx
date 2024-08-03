import {useDispatch, useSelector} from "../../app/types/hooks";
import {setOpenAuthorizationModal} from "../../app/services/slices/authorizationSlice.ts";
import {FormAuthorization} from "../FormAuthorization";
import {ModalWrapper} from "../../shared/ModalWrapper";
import LogoIcon from "../../app/assets/icons/logo_text.svg?react";

export const ModalAuthorization = () => {
  const dispatch = useDispatch();
  const {modalIsOpen} = useSelector(state => state.authorization);
  const handleClose = () => {
    dispatch(setOpenAuthorizationModal(false));
  };

  return (
    <ModalWrapper isOpen={modalIsOpen} handleClose={handleClose} Icon={LogoIcon}>
      <FormAuthorization/>
    </ModalWrapper>
  );
};
