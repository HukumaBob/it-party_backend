import React from "react";
import style from "./index.module.scss";
import { SearchInputFilters } from "../../shared/inputs/searchInputFilters";
import { SelectDate } from "../../shared/selectDate";
import { SelectCity } from "../../shared/selectCity";
import { Chip } from "../../shared/chip";
import { useSelector } from '../../app/types/hooks';
import { SelectOnline } from '../../shared/selectOnline';

export const FilterBlock = () => {
  const specializations = useSelector(state => state.events.specializations)

  return (
    <div className={style.wrapper}>
      <div className={style.containerTop}>
        <div className={style.searchContainer}>
          <SearchInputFilters />
        </div>
        <div className={style.rightPart}>
          <SelectDate id='1' />
          <SelectCity />
          <SelectOnline />
        </div>
      </div>
      <div className={style.containerButtons}>
        <Chip key={0} specialization='Все специализации' id={0} />
        {specializations.map(item => <Chip key={item.id} specialization={item.specialization} id={item.id} />)}
      </div>
    </div>
  );
};
