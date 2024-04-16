import React, { useEffect } from "react";
import { FilterBlock } from "../../features/FilterBlock";
import style from "./index.module.scss";
import { EventCard } from "../../shared/card";
import { useDispatch, useSelector } from "../../app/types/hooks";
import { getEvents } from "../../app/api/api";

import { eventCatalogMock } from "../../app/mocks/eventsCatalogMock";
export const EventsCatalog = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.events);
  useEffect(() => {
    if (!loading) {
      dispatch(getEvents());
    }
  }, [dispatch,loading]);

  return (
    <div className={style.wrapper}>
      <div className={style.filterBlock}>
        <FilterBlock />
      </div>
      <div className={style.cardsBlock}>
        {eventCatalogMock.map((event) => (
          <EventCard
            title={event.title}
            description={event.description}
            date={event.date}
            id={event.id}
            img={event.img}
            info={event.info}
            time={event.time}
          />
        ))}
      </div>
    </div>
  );
};
