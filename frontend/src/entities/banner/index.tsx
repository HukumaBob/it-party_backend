import React from "react";
import style from "./index.module.scss";
import banner_green from "../../app/assets/image/banners/banner_green.png";
import banner_orange from "../../app/assets/image/banners/banner_orange.png";
import banner_purple from "../../app/assets/image/banners/banner_purple.png";
import banner_blue from "../../app/assets/image/banners/banner_blue.png";
import { TActiveIndex } from "../../app/types/types";

export const Banner = ({ activeIndex }: TActiveIndex) => {
  const banners = [
    {
      date: "20 МАРТА ",
      title: "UNION ALL",
      city: "ОНЛАЙН",
      image: banner_orange,
      className: style.banner1,
    },
    {
      date: "4 АПРЕЛЯ ",
      title: "about:cloud infrastructure",
      city: "МОСКВА",
      image: banner_green,
      className: style.banner2,
    },
    {
      date: "24 МАЯ ",
      title: "InnoCode Conference",
      city: "ПИТЕР",
      image: banner_blue,
      className: style.banner3,
    },
    {
      date: "25 АПРЕЛЯ ",
      title: "Cloud Security Meetup",
      city: "МОСКВА",
      image: banner_purple,
      className: style.banner4,
    },
  ];

  const banner = banners[activeIndex] || banners[0];

  return (
    <div className={`${style.banner} ${banner.className}`}>
      <span className={style.box}></span>
      <span className={style.line}>
        {banner.date}  <span className={style.city}> / {banner.city}</span>{" "}
      </span>
      <img src={banner.image} alt='' />
      <span className={style.title}>{banner.title}</span>
      <span className={style.subTitle}>24’</span>
    </div>
  );
};
