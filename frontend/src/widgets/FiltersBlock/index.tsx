import {useDispatch, useSelector} from "../../app/types/hooks";
import {FilterSearch} from "../../features/FilterSearch";
import {FilterSpecialization} from '../../features/FilterSpecialization';
import {FilterDate} from "../../features/FilterDate";
import {FilterCity} from "../../features/FilterCity";
import {FilterOnline} from "../../features/FilterOnline";
import {ReactComponent as CalendarIcon} from "../../app/assets/icons/calendar.svg";
import {ReactComponent as ArrowRightIcon} from "../../app/assets/icons/arrow_right.svg";
import {ReactComponent as ArrowLeftIcon} from "../../app/assets/icons/arrow_left.svg";
import {
  clearCityFilter,
  clearDateBeforeFilter,
  clearDateAfterFilter,
  clearSpecializationsFilter
} from "../../app/services/slices/eventListSlice";
import cn from "classnames";
import style from "./index.module.scss";

export const FiltersBlock = () => {
  const dispatch = useDispatch()
  const {city, online, date_before, date_after, specializations} = useSelector(state => state.eventList.filters)
  const {status: cityStatus} = useSelector(state => state.city)
  const specializationError = useSelector(state => state.specializations.error)
  const eventsError = useSelector(state => state.eventList.error)

  return (
    <div className={cn({[style.disabled]: cityStatus === 'error' || specializationError || eventsError})}>

      <div className={style.container}>
        <FilterSearch/>
        <FilterSpecialization/>
        <FilterDate/>
        <FilterCity/>
        <FilterOnline/>
      </div>

      <div className={style.clearButtons}>

        {Object.keys(specializations).length !== 0 &&
          <button
            onClick={() => dispatch(clearSpecializationsFilter())}>
            Специализация
          </button>}

        {date_after &&
          <button className={style.dateAfter} onClick={() => dispatch(clearDateBeforeFilter())}>
            <CalendarIcon/>
            <ArrowRightIcon/>
          </button>}

        {date_before &&
          <button className={style.dateBefore} onClick={() => dispatch(clearDateAfterFilter())}>
            <ArrowLeftIcon/>
            <CalendarIcon/>
          </button>}

        {city &&
          <button onClick={() => dispatch(clearCityFilter())}>
            {city.label}
          </button>}

      </div>
    </div>
  );
}
