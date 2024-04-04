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
        <Chip background='blue' title='Разработка' icon={true} />
        <Chip background='purple' title='Дизайн' icon={false} />
        <Chip background='pink' title='Разработка' icon={false} />
        <Chip background='green' title='Разработка' icon={false} />
        <Chip background='orange' title='Разработка' icon={false} />
        <Chip background='yellow' title='Другое' icon={false} />
      </div>
    </div>
  );
};
