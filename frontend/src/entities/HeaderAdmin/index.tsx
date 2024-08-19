import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Popover} from "@mui/material";
import {useAppSelector} from "../../app/services/hooks.ts";
import {ModalLogout} from "../../widgets/ModalLogout";

export const HeaderAdmin = () => {
  const {first_name, last_name, user_photo} = useAppSelector((store) => store.profile.data);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  return (
    <header className='header admin'>
      <div className='header__container container'>
        <Link className='header__logo' to='/'>Я организую</Link>
        <button className='header__buttonMenu admin' onClick={handleOpenMenu}>
          {first_name}&nbsp;{last_name}
          <img className='header__avatar' src={user_photo} alt='avatar'/>
        </button>

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
          <nav className='header__nav admin'>
            <Link onClick={handleCloseMenu} to='/'>Вернуться на главную</Link>
            <Link onClick={handleCloseMenu} to='/admin/event/new'>Создать мероприятие</Link>
            <Link onClick={handleCloseMenu} to='/admin'>Мои мероприятия</Link>
            <ModalLogout handleCloseMenu={handleCloseMenu}/>
          </nav>
        </Popover>

      </div>
    </header>
  );
};
