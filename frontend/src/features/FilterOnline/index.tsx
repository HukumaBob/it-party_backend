import {setOnlineFilter} from "../../app/services/slices/eventListSlice";
import {useDispatch, useSelector} from "../../app/types/hooks";
import cn from "classnames";
import style from "./index.module.scss";

export const FilterOnline = (props: any) => {
  const dispatch = useDispatch();
  const {online} = useSelector(state => state.eventList.filters)

  return (
    <button
      className={cn(style.onlineButton, {[style.active]: online})}
      onClick={() => dispatch(setOnlineFilter())}
    >
      Online
    </button>
  );
};
