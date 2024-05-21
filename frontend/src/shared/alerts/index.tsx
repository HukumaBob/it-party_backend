import React, { useEffect } from "react";
import style from "./index.module.scss";
import successForm from "../../app/assets/icons/successForm.svg";
export const AlertForm = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    
  }, []);
  return (
    <div className={style.container}>
      <div className={style.text}>
        <img src={successForm} alt='iconSuccess' />
        Ваша Форма успешно отправлена
      </div>
    </div>
  );
};
