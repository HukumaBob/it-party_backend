import React, { useEffect } from "react";
import { FilterBlock } from "../../features/FilterBlock";
import style from "./index.module.scss";
import { EventCard } from "../../shared/card";
import { useDispatch, useSelector } from "../../app/types/hooks";
import { getMyEventsList } from "../../app/services/actions/myEvents";

export const EventsCatalog = () => {
  const dispatch = useDispatch();
  const { myEvent, loading } = useSelector((store) => store.myEvents);
  useEffect(() => {
    dispatch(getMyEventsList());
  }, [dispatch]);

  return (
    <div className={style.wrapper}>
      <div className={style.filterBlock}>
        <FilterBlock />
      </div>
      <div className={style.cardsBlock}>
        {loading ? (
          <span>Загрузка данных....</span>
        ) : (
          <div className={style.allEvents}>
            {myEvent.length === 0 ? (
              <span>Нет зарегистрированных мероприятий</span>
            ) : (
              myEvent.slice(0,12).map((event) => (
                <EventCard
                  key={event.id}
                  title={event.name}
                  description={event.description}
                  date={event.date}
                  id={event.id}
                  img={event.logo}
                  time={event.time}
                  myEventBoolean={true}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
