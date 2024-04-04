import React from "react";
import style from "./index.module.scss";
import arrow_down from "../../app/assets/icons/arrow_down.svg";
export const SelectCity = () => {
  return (
    <div className={style.container}>
      <span className={style.selectCity}>
        <img src={arrow_down} alt='arrow_down' /> Город
      </span>
    </div>
  );
};
