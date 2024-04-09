import React from "react";
import style from "./index.module.scss";
import { SearchInput } from "../../shared/inputs/searchInput";
import settings from "../../app/assets/icons/settings.svg";
import { SelectDate } from "../../shared/selectDate";
import { SelectCity } from "../../shared/selectCity";
import { CheckBox } from "../../shared/checkbox";
import { Chip } from "../../shared/chip";
export const FilterBlock = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.containerTop}>
        <div className={style.leftPart}>
          <SearchInput />
          <img src={settings} alt='settings' />
        </div>
        <div className={style.rightPart}>
          <SelectDate />
          <SelectCity />
          <span className={style.rightPart_element_checkbox}>
            <CheckBox /> Online
          </span>
        </div>
      </div>
      <div className={style.filterButton}>
        <Chip background='blue' title='Backend' />
        <Chip background='purple' title='Frontend' />
        <Chip background='pink' title='Mobile' />
        <Chip background='green' title='QA' />
        <Chip background='orange' title='ML' />
      </div>
    </div>
  );
};
