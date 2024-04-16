import React, { useState } from "react";
import style from "./index.module.scss";
import arrow_down from "../../app/assets/icons/arrow_down.svg";

export const SelectCity = () => {
  const [click, setClick] = useState<boolean>(false);
  const handleClick = () => {
    setClick(!click);
  };
  return (
    <div className={style.container}>
      <div className={style.customSelect} onClick={handleClick}>
        <img src={arrow_down} alt='arrow' />
        <span>Москва</span>
      </div>
      {click && (
        <div className={style.options}>
          <div className={style.option}>Москва</div>
          <div className={style.option}>Питер</div>
          <div className={style.option}>Казань</div>
        </div>
      )}
    </div>
  );
};
