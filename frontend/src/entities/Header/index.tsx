import React, {useEffect, useState} from "react";
import {Popover} from "@mui/material";
import {Link, useMatch} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/services/hooks.ts";
import {setOpenAuthorizationModal} from "../../app/services/slices/authorizationSlice.ts";
import {getUserProfile} from "../../app/services/slices/profileSlice.ts";
import {ModalLogout} from "../../widgets/ModalLogout";
import LogoIcon from "../../app/assets/icons/logo.svg?react";
import login_avatar from '../../app/assets/image/other/avatar.webp'
import style from "./index.module.scss";

export const Header = () => {
  const dispatch = useAppDispatch();
  const isMainPage = useMatch('/')
  const {isAuthorized} = useAppSelector(state => state.authorization);
  const {statusGetProfile} = useAppSelector(state => state.profile);
  const {first_name, last_name, user_photo} = useAppSelector(state => state.profile.data);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => {
    dispatch(setOpenAuthorizationModal(true));
  };

  useEffect(() => {
    if (isAuthorized && statusGetProfile === 'idle') {
      dispatch(getUserProfile());
    }
  }, [isAuthorized, statusGetProfile]);

  const [modalLogoutIsOpen, setModalLogoutIsOpen] = useState(false);
  const handleOpenModalLogout = () => {
    setModalLogoutIsOpen(true);
  };
  const handleCloseModalLogout = () => {
    handleCloseMenu();
    setModalLogoutIsOpen(false);
  };

  return (
    <header className={style.header}>
      <div className='container'>

        <div className={style.container}>
          {isMainPage ? <LogoIcon/> : <Link to='/'><LogoIcon/></Link>}

          {isAuthorized
            ? <button className={style.buttonMenu} onClick={handleOpenMenu}>
              {first_name}&nbsp;{last_name}
              <img className={style.avatar} src={user_photo} alt='avatar'/>
            </button>
            : <button className={style.buttonEnter} onClick={handleOpenModal}>
              Login
              <img className={style.avatar} src={login_avatar} alt='avatar'/>
            </button>}
        </div>

        <Popover
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
          transformOrigin={{vertical: 'top', horizontal: 'right'}}
          sx={{
            marginTop: '20px',
            '.MuiPaper-root': {
              borderRadius: 0,
              boxShadow: '0 3px 3px 0 #00000011'
            }
          }}>
          <nav className={style.popOver}>
            <Link onClick={handleCloseMenu} to='/profile'>Управление аккаунтом</Link>
            <Link onClick={handleCloseMenu} to='/profile/events'>Мои мероприятия</Link>
            <Link onClick={handleCloseMenu} to='/admin'>Админ панель</Link>
            <button onClick={handleOpenModalLogout}>Выйти</button>
          </nav>
        </Popover>

        <ModalLogout isOpen={modalLogoutIsOpen} handleClose={handleCloseModalLogout}/>
      </div>
    </header>
  );
};
