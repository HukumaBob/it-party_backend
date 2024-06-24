import React, { useState } from "react";
import { TQuestion } from "../../app/types/types";
import style from "./index.module.scss";
import arrow_open from "../../app/assets/icons/arrow_open.svg";
import arrow_close from "../../app/assets/icons/arrow_close.svg";
export const Question = ({ text, response }: TQuestion) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div
      className={open ? style.response : style.questionBlock}
      onClick={handleClick}>
      <p className={style.question}>
        <span className={style.text}>{text}</span>
        {open ? <span className={style.responseText}>{response}</span> : ""}
      </p>
      {open ? (
        <img src={arrow_close} alt='Icon' />
      ) : (
        <img src={arrow_open} alt='Icon' />
      )}
    </div>
  );
};
