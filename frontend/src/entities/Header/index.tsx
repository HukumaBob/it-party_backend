import React, {useState} from "react";
import {Popover} from "@mui/material";
import {Link, useMatch, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "../../app/types/hooks";
import {setOpenModal} from "../../app/services/slices/authorization";
import {resetProfile} from "../../app/services/slices/profileSlice";
import {ReactComponent as LogoIcon} from "../../app/assets/icons/logo.svg";
import login_avatar from '../../app/assets/image/other/login_avatar.webp'
import style from "./index.module.scss";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isMainPage = useMatch('/')
  const isAuthorized = Boolean(localStorage.getItem("accessToken"));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const {name, secondName, avatar} = useSelector((store) => store.profile);
  const handleOpenModal = () => {
    dispatch(setOpenModal(true));
  };
  const handleLogout = () => {
    handleCloseMenu()
    dispatch(resetProfile())
    navigate('/', {replace: true});
  };

  return (
    <header className={style.header}>
      <div className='container'>

        <div className={style.container}>
          {isMainPage ? <LogoIcon/> : <Link to='/'><LogoIcon/></Link>}

          {isAuthorized
            ? <button className={style.buttonMenu} onClick={handleOpenMenu}>
              {name}&nbsp;{secondName}
              <img className={style.avatar} src={avatar} alt='avatar'/>
            </button>
            : <button className={style.buttonEnter} onClick={handleOpenModal}>
              Login
              <img className={style.avatar} src={login_avatar} alt="avatar icon"/>
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
            <Link onClick={handleLogout} to='/'>Выйти</Link>
          </nav>
        </Popover>

      </div>
    </header>
  );
};
