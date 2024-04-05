import React from "react";
import style from "./index.module.scss";
import logo from "../../app/assets/icons/logo.svg";
import search from "../../app/assets/icons/search.svg";
import avatar from "../../app/assets/icons/avatar.svg";
export const Header = () => {
  return (
    <header className={style.container}>
      <div className={style.main}>
        <div className={style.logo}>
          <img src={logo} alt='logo' />
        </div>
        <div className={style.inputBlock}>
          <input className={style.input} />
          <img src={search} alt='' />
        </div>
        <div className={style.avatar}>
          <img src={avatar} alt='avatar' />
        </div>
      </div>
    </header>
  );
};
