import React from "react";
import style from "./index.module.scss";
import gallery_1 from "../../app/assets/image/other/gallery_1.png";
import gallery_2 from "../../app/assets/image/other/gallery_2.png";
import gallery_3 from "../../app/assets/image/other/gallery_3.png";
export const Gallery = () => {
  return (
    <div className={style.container}>
      <div className={style.topImage}>
        <img src={gallery_1} alt='' className={style.gallery_1} />
        <img src={gallery_2} alt='' className={style.gallery_2} />
      </div>
      <img src={gallery_3} alt='' className={style.gallery_3} />
    </div>
  );
};
