import search from "../../../app/assets/icons/search_blue.svg";
import close from "../../../app/assets/icons/close_mini_blue.svg";
import style from "./index.module.scss";
import { useDispatch, useSelector } from '../../../app/types/hooks';
import { getEventsList } from '../../../app/api/api';
import { searchName } from '../../../app/services/slices/eventsSlice';

export const SearchInputFilters = () => {
  const dispatch = useDispatch()
  const { name: value } = useSelector(state => state.events.filters)
  const handleSearch = () => { dispatch(getEventsList()) }
  const handleChange = (value: string) => { dispatch(searchName(value)) }

  const handleReset = () => {
    handleChange("")
    handleSearch()
  }

  return (
    <div className={style.inputBlock}>
      <input className={style.input} value={value} onChange={(e) => handleChange(e.target.value)} />
      <img className={style.search} src={search} alt='searchIcon' onClick={handleSearch} />
      <img className={value ? "" : style.hidden} src={close} alt='closeIcon' onClick={handleReset} />
    </div>
  );
};

