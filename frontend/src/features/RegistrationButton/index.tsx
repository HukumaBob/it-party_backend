import React, { useState } from "react";
import style from "./index.module.scss";
import { PopupRegistration } from "../../entities/PopupRegistration";

export const RegistrationButton = ({id}:{id?:number}) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
    window.scrollTo({ top: 100, behavior: "smooth" });
  };
  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <div>
      <button className={style.button} onClick={handleOpen}>
        Зарегистрироваться
      </button>
      {open && (
        <div className={style.popup}>
          <PopupRegistration onClose={handleClose} id={id!} />
        </div>
      )}
    </div>
  );
};
