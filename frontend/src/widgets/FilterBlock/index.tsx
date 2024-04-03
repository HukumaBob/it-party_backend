import React from "react";
import style from "./index.module.scss";
import { SearchInput } from "../../shared/inputs/searchInput";
import settings from "../../app/assets/icons/settings.svg";
import calendar from "../../app/assets/icons/calendar.svg";
import arrow_down from "../../app/assets/icons/arrow_down.svg";
import close from "../../app/assets/icons/close_mini.svg";
export const FilterBlock = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.containerTop}>
        <div className={style.leftPart}>
          <SearchInput />
          <img src={settings} alt='settings' />
        </div>
        <div className={style.rightPart}>
          <span className={style.rightPart_element_data}>
            <img src={calendar} alt='calendar' /> Выбор даты
          </span>
          <span className={style.rightPart_element_city}>
            <img src={arrow_down} alt='arrow_down' /> Город
          </span>
          <span className={style.rightPart_element_checkbox}>
            <label className={style.customCheckBox}></label> Online
          </span>
        </div>
      </div>
      <div className={style.filterButton}>
        <div className={style.chip_1}>
          Разработка <img src={close} alt='closeIcon' />
        </div>
        <div className={style.chip_2}>Дизайн</div>
        <div className={style.chip_3}>Тестирование</div>
        <div className={style.chip_4}>Менеджмент</div>
        <div className={style.chip_5}>Маркетинг</div>
        <div className={style.chip_6}>Другое</div>
      </div>
    </div>
  );
};
