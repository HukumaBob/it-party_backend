import React from "react";
import { TChip } from "../../app/types/types";
import style from "./index.module.scss";
import { searchSpecialization } from '../../app/services/slices/eventsSlice';
import { useSelector, useDispatch } from '../../app/types/hooks';
import { getEventsList } from '../../app/api/api';

export const Chip = ({ specialization, id }: TChip) => {
  const dispatch = useDispatch()
  const isActive = useSelector(state => state.events.specializationsFilters[String(id)])

  const handleClick = () => {
    if (id === 0) {
      dispatch(searchSpecialization({ clear: true }))
    } else if (!isActive) {
      dispatch(searchSpecialization({ id: id, add: true }))
    } else {
      dispatch(searchSpecialization({ id: id, add: false }))
    }
    dispatch(getEventsList())
  }

  return (
    <div
      className={`${style.chip} ${isActive ? style.active : ""}`}
      onClick={handleClick}>
      {specialization}
    </div>
  );
};