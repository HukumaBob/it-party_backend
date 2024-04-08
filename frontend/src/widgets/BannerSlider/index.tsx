import React, { useEffect, useState } from "react";
import { Banner } from "../../entities/banner";
import style from "./index.module.scss";
import { SlideSwitcher } from "../../features/slideSwitcher";

export const BannerSlider = () => {
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
    <div className={style.bannerBlock}>
      <Banner activeIndex={activeIndex} />
      <SlideSwitcher
        activeIndex={activeIndex}
        handleClick={handleClick}
        length={4}
      />
    </div>
  );
};
