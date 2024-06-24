import React, { useState } from "react";
import style from "./index.module.scss";

import arrow_open from "../../app/assets/icons/arrow_open.svg";
import arrow_close from "../../app/assets/icons/arrow_close.svg";
import { TForm } from "../../app/types/types";

export const Form = ({ nameForm, children }: TForm) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div className={style.container}>
      <div className={style.personalInfo}>
        <h3 className={style.personalInfo_text} onClick={handleClick}>
          {nameForm}
        </h3>
        {open ? (
          <img src={arrow_close} alt='arrow_close' />
        ) : (
          <img src={arrow_open} alt='arrow_open' />
        )}
      </div>
      {open && <div className={style.formBlock}>{children}</div>}
    </div>
  );
};
