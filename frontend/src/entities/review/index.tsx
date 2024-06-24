import React from "react";
import style from "./index.module.scss";
import { TReview } from "../../app/types/types";
export const Review = ({
  img,
  company,
  description,
  text,
  activeIndex,
  isActive,
}: TReview) => {
  return (
    <div className={`${isActive ? style.review : style.none}`}>
      <div className={style.background}></div>
      <div className={style.background}></div>
      <div className={style.review_user}>
        <img src={img} alt='userPhoto' />
        <section className={style.review_user__info}>
          <h2>{company}</h2>
          <span>{description}</span>
        </section>
      </div>
      <p className={style.review_text}>{text}</p>
    </div>
  );
};
