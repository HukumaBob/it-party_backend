import React, { useState } from "react";
import style from "./index.module.scss";
import logo from "../../app/assets/icons/logo_black.svg";
import avatar from "../../app/assets/icons/avatar.svg";
import { SearchInput } from "../../shared/inputs/searchInput";
import { Link } from "react-router-dom";
export const Header = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <header className={style.container}>
      <div className={style.main}>
        <div className={style.logo}>
          <Link to='/'>
            <img src={logo} alt='logo' />
          </Link>
        </div>
        <SearchInput />
        <div className={style.avatar} onClick={handleClick}>
          {/* <span>Владимир</span> */}
          <img src={avatar} alt='avatar' />
          {/* {open ? (
            <ul className={style.dropMenu}>
              <li>Управление аккаунтом</li>
              <li>Мои мероприятия</li>
              <li>Помощь</li>
              <li>Выйти</li>
            </ul>
          ) : (
            ""
          )} */}
        </div>
      </div>
    </header>
  );
};
