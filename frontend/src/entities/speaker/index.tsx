import React from "react";
import style from "./index.module.scss";
import { TSpeaker } from "../../app/types/types";
export const Speaker = ({img,name,post}:TSpeaker) => {
  return (
    <div className={style.speaker_1}>
      <img src={img} alt='' className={style.image}/>
      <p className={style.speaker_1__info}>
        <span className={style.name}>{name}</span>
        <span className={style.post}>{post}</span>
      </p>
    </div>
  );
};
