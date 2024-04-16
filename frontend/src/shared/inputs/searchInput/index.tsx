import React from "react";
import style from "./index.module.scss";
import search from "../../../app/assets/icons/search_blue.svg";
export const SearchInput = () => {
  return (
    <div className={style.inputBlock}>
      <input className={style.input} />
      <img src={search} alt='searchIcon' />
    </div>
  );
};
