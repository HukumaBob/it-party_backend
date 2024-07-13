import React, {useState} from 'react';
import {Popover} from "@mui/material";
import {ReactComponent as SettingsIcon} from "../../app/assets/icons/settings.svg";
import {ButtonSpecialization} from '../../entities/ButtonSpecialization';
import {useSelector} from '../../app/types/hooks';
import cn from 'classnames';
import style from "./index.module.scss";

export const FilterSpecialization = () => {
  const {data} = useSelector(state => state.specializations)
  const {specializations} = useSelector(state => state.eventList.filters)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className={cn(style.button, {[style.active]: Object.keys(specializations).length !== 0})}
        disabled={!data}
      >
        <SettingsIcon/>
      </button>

      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
        transformOrigin={{vertical: 'top', horizontal: 'left'}}
        transitionDuration={0}
        sx={{
          marginTop: '3px',
          maxHeight: '400px',
          '.MuiPaper-root': {
            borderRadius: '8px',
            outline: '1px solid var(--c-str-medium)',
            boxShadow: '-6px 6px 10px 0 #00000044',
          }
        }}>
        <div className={style.buttonsList}>
          {data && data.map(item =>
            <ButtonSpecialization key={item.id} id={item.id} title={item.specialization}/>
          )}
        </div>
      </Popover>

    </div>
  );
};


