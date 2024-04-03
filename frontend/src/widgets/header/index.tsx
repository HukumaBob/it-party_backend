import React from "react";
import style from "./index.module.scss";
import logo from "../../app/assets/icons/logo_black.svg";
import avatar from "../../app/assets/icons/avatar.svg";
import { SearchInput } from "../../shared/inputs/searchInput";
export const Header = () => {
  return (
    <header className={style.container}>
      <div className={style.main}>
        <div className={style.logo}>
          <img src={logo} alt='logo' />
        </div>
        <SearchInput />
        <div className={style.avatar}>
          <img src={avatar} alt='avatar' />
        </div>
      </div>
    </header>
  );
};
