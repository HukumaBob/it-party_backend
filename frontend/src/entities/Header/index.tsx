import React, {useState} from "react";
import {Popover} from "@mui/material";
import {Link, useMatch} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/services/hooks.ts";
import {setOpenAuthorizationModal} from "../../app/services/slices/authorizationSlice.ts";
import {ModalLogout} from "../../widgets/ModalLogout";
import LogoIcon from "../../app/assets/icons/logo.svg?react";
import LoginIcon from "../../app/assets/icons/login.svg?react";

export const Header = () => {
  const dispatch = useAppDispatch();
  const isMainPage = useMatch('/')
  const isActivationPage = useMatch('/activate/*')
  const {isAuthorized} = useAppSelector(state => state.authorization);
  const {first_name, last_name, user_photo} = useAppSelector(state => state.profile.data);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);
  const handleOpenModal = () => dispatch(setOpenAuthorizationModal(true));

  return (
    <header className='header'>
      <div className='header__container container'>
        {isMainPage ? <LogoIcon className='header__logo'/> : <Link to='/' className='header__logo'><LogoIcon/></Link>}

        {isActivationPage ? null :
          isAuthorized
            ? <button className='header__buttonMenu' onClick={handleOpenMenu}>
              {first_name}&nbsp;{last_name}
              <img className='header__avatar' src={user_photo} alt='avatar'/>
            </button>
            : <button className='header__buttonEnter' onClick={handleOpenModal}>
              Login <LoginIcon/>
            </button>}

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
              boxShadow: '0 3px 3px 0 #00000011',
            }
          }}>
          <nav className='header__nav'>
            <Link onClick={handleCloseMenu} to='/profile'>Управление аккаунтом</Link>
            <Link onClick={handleCloseMenu} to='/profile/events'>Мои мероприятия</Link>
            <Link onClick={handleCloseMenu} to='/admin'>Админ панель</Link>
            <ModalLogout handleCloseMenu={handleCloseMenu}/>
          </nav>
        </Popover>

      </div>
    </header>
  );
};
