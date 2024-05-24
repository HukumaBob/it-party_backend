import React, { useState } from "react";
import style from "./index.module.scss";
import checkIcon from "../../app/assets/icons/check_mini.svg";

export const CheckBox = () => {
  const [check, setCheck] = useState<boolean>(false);
  const handleClick = () => {
    setCheck(!check);
  };

  return (
    <div className={style.container} onClick={handleClick}>
      {check ? <img src={checkIcon} alt='check' /> : ""}
    </div>
  );
};
