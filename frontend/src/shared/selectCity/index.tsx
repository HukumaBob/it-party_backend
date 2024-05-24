import { useDispatch, useSelector } from '../../app/types/hooks';
import arrow_down from "../../app/assets/icons/arrow_down.svg";
import style from "./index.module.scss";
import { getEventsList } from "../../app/api/api"
import { searchCity } from '../../app/services/slices/eventsSlice';

export const SelectCity = () => {
  const dispatch = useDispatch()
  const { cities, loading, filters: { city = 0 } } = useSelector(state => state.events)

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(searchCity(e.target.value))
    dispatch(getEventsList())
  }

  return (
    <div className={style.container}>
      <img className={style.arrow} src={arrow_down} alt='arrow' />
      <select onChange={handleOnChange} disabled={loading} className={style.select} value={city}>
        <option value={0}>Все Города</option>
        {cities.map(({ id, name }) => <option value={id}>{name}</option>)}
      </select>
    </div>
  )
};