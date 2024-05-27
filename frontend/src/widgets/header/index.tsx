import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./index.module.scss";
import logo from "../../app/assets/icons/logo_black.svg";
import avatar from "../../app/assets/icons/avatar.svg";
import { SearchInput } from "../../shared/inputs/searchInput";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "../../app/types/hooks";
import { setOpenModal } from "../../app/services/slices/authorization";
import noAuthUser from "../../app/assets/icons/NoAuthUser.svg";
export const Header = () => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleClick = () => {
    setOpen(!open);
  };
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");
  const { name,secondName } = useSelector((store) => store.profile);
  const handleOpenModal = () => {
    dispatch(setOpenModal(true));
  };
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("updateInfo");
    localStorage.removeItem("countries");
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
          {accessToken ? (
            <img src={avatar} alt='avatar' />
          ) : (
            <img src={noAuthUser} alt='noAuthUser' onClick={handleOpenModal} />
          )}
          {open && accessToken && (
            <ul className={style.dropMenu}>
              <li className={style.dropMenu_avatar}>
                <span>{name} {secondName}</span>
                <img src={avatar} alt='avatar' />
              </li>
              <li>
                <Link to='/account'>Управление аккаунтом</Link>
              </li>
              <li>
                <Link to='/myEvent'>Мои мероприятия</Link>
              </li>
              <li>
                <Link to='/admin'>Админ панель</Link>
              </li>
              <li>
                <Link to='/' onClick={logout}>
                  Выйти
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};
