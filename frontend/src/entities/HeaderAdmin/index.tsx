import React, {useState} from "react";
import {Popover} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "../../app/types/hooks";
import {resetProfile} from "../../app/services/slices/profileSlice";
import style from "./index.module.scss";

export const HeaderAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const {name, secondName, avatar} = useSelector((store) => store.profile);
  const handleLogout = () => {
    handleCloseMenu()
    dispatch(resetProfile())
    navigate('/', {replace: true});
  };

  return (
    <header className={style.header}>
      <div className='container'>

        <div className={style.container}>
          <h1 className={style.title}>Я организую</h1>
          <button className={style.buttonMenu} onClick={handleOpenMenu}>
            {name}&nbsp;{secondName}
            <img className={style.avatar} src={avatar} alt='avatar'/>
          </button>
        </div>

        <Popover
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
          transformOrigin={{vertical: 'top', horizontal: 'right'}}
          sx={{
            marginTop: '18px',
            '.MuiPaper-root': {
              borderRadius: 0,
              boxShadow: '0 3px 3px 0 #00000011'
            }
          }}>
          <nav className={style.popOver}>
            <Link onClick={handleCloseMenu} to='/'>Вернуться на главную</Link>
            <Link onClick={handleCloseMenu} to='/admin/event/new'>Создать мероприятие</Link>
            <Link onClick={handleCloseMenu} to='/admin'>Мои мероприятия</Link>
            <Link onClick={handleLogout} to='/'>Выйти</Link>
          </nav>
        </Popover>

      </div>
    </header>
  );
};
