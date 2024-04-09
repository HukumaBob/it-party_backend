import React, { useEffect } from "react";
import { Banner } from "../../entities/banner";
import style from "./index.module.scss";
import { SlideSwitcher } from "../../features/slideSwitcher";
import { useDispatch, useSelector } from "../../app/types/hooks";
import { setActiveIndex } from "../../app/services/slices/bannerSlice";

export const BannerSlider = () => {
  const dispatch = useDispatch();
  const { activeIndex } = useSelector((store) => store.banner);
  const handleClick = (index: number) => {
    dispatch(setActiveIndex(index));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIndex = (activeIndex + 1) % 4;
      dispatch(setActiveIndex(nextIndex));
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [activeIndex, dispatch]);

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
