import {setOnlineFilter} from "../../app/services/slices/eventListSlice";
import {useAppDispatch, useAppSelector} from "../../app/services/hooks.ts";
import cn from "classnames";
import style from "./index.module.scss";

export const FilterOnline = () => {
  const dispatch = useAppDispatch();
  const {online} = useAppSelector(state => state.eventList.filters)

  return (
    <button
      className={cn(style.onlineButton, {[style.active]: online})}
      onClick={() => dispatch(setOnlineFilter())}
    >
      Online
    </button>
  );
};
