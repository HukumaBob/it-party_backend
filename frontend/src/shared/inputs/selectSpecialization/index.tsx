import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import { ReactComponent as SettingsIcon } from "../../../app/assets/icons/settings.svg";
import { useSelector } from '../../../app/types/hooks';
import { Chip } from '../../chip';
import style from "./index.module.scss";

export const SelectSpecialization = () => {
    const specializations = useSelector(state => state.events.specializations)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={style.container}>
            <button onClick={handleClick} className={style.button}>
                <SettingsIcon />
            </button>
            <Menu
                className={style.menu}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                sx={{
                    '.MuiPaper-root': {
                        borderRadius: '8px',
                        maxHeight: '400px',
                        marginTop: '3px',
                        outline: '1px solid #8dbffb',
                    },
                }}>
                <div className={style.chips}>
                    <Chip
                        key={0}
                        specialization='Все специализации'
                        id={0} />
                    {specializations.map(item =>
                        <Chip
                            key={item.id}
                            specialization={item.specialization}
                            id={item.id} />
                    )}
                </div>
            </Menu>
        </div>
    );
};