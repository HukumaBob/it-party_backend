import { useDispatch, useSelector } from '../../app/types/hooks';
import arrow_down from "../../app/assets/icons/arrow_down.svg";
import style from "./index.module.scss";
import { getEventsList } from "../../app/api/api"
import { searchOnline } from '../../app/services/slices/eventsSlice';


export const SelectOnline = () => {
    const dispatch = useDispatch()
    const { online } = useSelector(state => state.events.filters)

    const getValue = () => {
        switch (online) {
            case true: return 'online';
            case false: return 'offline';
            default: return 'all'
        }
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(searchOnline(e.target.value))
        dispatch(getEventsList())
    }

    return (
        <div className={style.container}>
            <img className={style.arrow} src={arrow_down} alt='arrow' />
            <select onChange={handleOnChange} className={style.select} value={getValue()}>
                <option value={"online"}>Online</option>
                <option value={"offline"}>Offline</option>
                <option value={"all"}>Все</option>
            </select>
        </div>
    )
};