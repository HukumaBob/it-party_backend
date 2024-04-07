import React from "react";
import style from "./index.module.scss";
import howToGet from "../../app/assets/image/other/howToGet.png";
export const HowToGet = () => {
  return (
    <div className={style.container}>
      <h2>Как добраться</h2>
      <div className={style.howToGet}>
        <span>Россия, Москва, улица Льва Толстого, 16, под.4</span>
        <img src={howToGet} alt='' />
      </div>
    </div>
  );
};
