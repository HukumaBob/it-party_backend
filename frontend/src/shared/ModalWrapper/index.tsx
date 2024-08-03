import React, {SVGProps} from "react";
import Modal from "@mui/material/Modal";
import CloseIcon from "../../app/assets/icons/close.svg?react";
import style from "./index.module.scss";

type TProps = {
  isOpen: boolean;
  handleClose: () => void;
  Icon?: React.FC<SVGProps<SVGSVGElement>>;
  children: React.ReactNode;
};

export const ModalWrapper: React.FC<TProps> = ({isOpen = false, handleClose, Icon, children}) => {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal"
      aria-describedby="modal-container"
      sx={{
        display: 'grid',
        placeContent: 'center',
        gridTemplateColumns: 'minmax(auto, 414px)',
        '.MuiBackdrop-root': {backdropFilter: 'blur(3px)'}
      }}>
      <div className={style.wrapper}>
        {Icon && <Icon className={style.logo}/>}
        <div className={style.container}>
          <button className={style.buttonClose} onClick={handleClose} type='button'>
            <CloseIcon/>
          </button>
          {children}
        </div>
      </div>
    </Modal>
  );
};
