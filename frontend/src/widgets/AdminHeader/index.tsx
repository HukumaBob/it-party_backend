import React, { useState } from "react";
import style from "./index.module.scss";

import headerImage from "../../app/assets/image/other/headerImage.png";
import { Link, useLocation} from "react-router-dom";
export const AdminHeader = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const location = useLocation();
  console.log(location.pathname === "/newApplication");
  return (
    <header
      className={`${
        location.pathname !== "/newApplication"
          ? style.container
          : style.newApplication
      }`}>
      <div className={style.main}>
        <h2 className={style.title}>Я Организую</h2>
        <div className={style.avatar} onClick={handleClick}>
          <img src={headerImage} alt='avatar' />
          {open ? (
            <ul className={style.dropMenu}>
              <li className={style.dropMenu_avatar}>
                <span>Ирина Нижегородова</span>
                <img src={headerImage} alt='avatar' />
              </li>
              <li>Управление аккаунтом</li>
              <li>
                <Link to='/'>Вернуться на главную</Link>
              </li>
              <li>
                <Link to='/admin'>Вернуться к мероприятиям</Link>
              </li>
              <li>Выйти</li>
            </ul>
          ) : (
            ""
          )}
        </div>
      </div>
    </header>
  );
};
