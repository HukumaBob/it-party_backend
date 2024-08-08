import React from "react";
import {setSpecializationFilter} from '../../app/services/slices/eventListSlice';
import {useAppSelector, useAppDispatch} from '../../app/services/hooks.ts';
import cn from 'classnames';
import style from "./index.module.scss";

export const ButtonSpecialization: React.FC<{ title: string, id: number }> = ({title, id}) => {
  const dispatch = useAppDispatch()
  const isActive = useAppSelector(state => state.eventList.filters.specializations?.[String(id)])

  const handleClick = () => {
    dispatch(setSpecializationFilter({id: id, type: isActive ? 'remove' : 'add'}))
  }

  return (
    <button
      className={cn(style.button, {[style.active]: isActive})}
      onClick={handleClick}>
      {title}
    </button>
  );
};
