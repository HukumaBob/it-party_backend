import React, { useState } from "react";
import style from "./index.module.scss";
import { PopupRegistration } from "../../entities/PopupRegistration";
import { useDispatch } from "../../app/types/hooks";
import { postEvent } from "../../app/api/api";

export const RegistrationButton = ({ id }: { id?: number }) => {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleOpen = () => {
    if (id !== undefined) {
      setOpen(true);
      window.scrollTo({ top: 100, behavior: "smooth" });
      dispatch(postEvent({ id }));
    } else {
      console.error("id is undefined");
    }
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
