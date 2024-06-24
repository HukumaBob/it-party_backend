import React from "react";
import style from "./index.module.scss";
import { TSlideSwitcher } from "../../app/types/types";
export const SlideSwitcher = ({
  activeIndex,
  handleClick,
  length,
}: TSlideSwitcher) => {
  return (
    <p className={style.slideBlock}>
      {Array.from({ length: length }).map((_, index) => (
        <span
          key={index}
          className={`${
            index === activeIndex ? style.slideActive : style.slide
          }`}
          onClick={() => handleClick && handleClick(index)}></span>
      ))}
    </p>
  );
};
