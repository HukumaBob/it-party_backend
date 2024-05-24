import search from "../../../app/assets/icons/search_blue.svg";
import style from "./index.module.scss";

export const SearchInput = () => {
  return (
    <div className={style.inputBlock}>
      <input className={style.input} />
      <img className={style.search} src={search} alt='searchIcon' />
    </div>
  );
};

