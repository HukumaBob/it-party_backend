import React from "react";
import {setSpecializationFilter} from '../../app/services/slices/eventListSlice';
import {useSelector, useDispatch} from '../../app/types/hooks';
import cn from 'classnames';
import style from "./index.module.scss";

export const ButtonSpecialization: React.FC<{ title: string, id: number }> = ({title, id}) => {
  const dispatch = useDispatch()
  const isActive = useSelector(state => state.eventList.filters.specializations?.[String(id)])

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
