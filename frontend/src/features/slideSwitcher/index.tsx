import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
export const SlideSwitcher = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIndex = (activeIndex + 1) % 4;
      setActiveIndex(nextIndex);
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [activeIndex]);
  return (
    <p className={style.slideBlock}>
      {[0, 1, 2, 3].map((index) => (
        <span
          key={index}
          className={`${
            index === activeIndex ? style.slideActive : style.slide
          }`}
          onClick={() => handleClick(index)}></span>
      ))}
    </p>
  );
};
