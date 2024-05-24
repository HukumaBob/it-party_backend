import React, { useEffect } from "react";
import { FilterBlock } from "../../features/FilterBlock";
import style from "./index.module.scss";
import { EventCard } from "../../shared/card";
import { useDispatch, useSelector } from "../../app/types/hooks";
import { getEventsList } from "../../app/api/api";

export const EventsCatalog = () => {
  const dispatch = useDispatch();
  const { cards, loading } = useSelector((store) => store.events);
  useEffect(() => {
    dispatch(getEventsList());
  }, [dispatch]);

  return (
    <div className={style.wrapper}>
      <div className={style.filterBlock}>
        <FilterBlock />
      </div>
      <div className={style.cardsBlock}>
        <div className={style.allEvents}>
          {loading && <span>Загрузка данных....</span>}
          {!cards && <span>Нет зарегистрированных мероприятий</span>}
          {cards.map(card => (
            <EventCard
              key={card.id}
              id={card.id}
              title={card.name}
              description={card.description}
              date={card.date}
              img={card.logo}
              time={card.time}
              myEventBoolean={true}
            />
          ))}

        </div>
      </div>
    </div>
  );
};