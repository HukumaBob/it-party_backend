import React, { useEffect } from "react";
import style from "./index.module.scss";
import { ActiveTabMyEvents } from "../../shared/activeTabMyEvents";
import { useDispatch, useSelector } from "../../app/types/hooks";
import { EventCard } from "../../shared/card";
import { eventCatalogMock } from "../../app/mocks/eventsCatalogMock";
import { getMyEventsList } from "../../app/services/actions/myEvents";

export const MyEventPage = () => {
  const { activeTab, favouriteEvents, myEvent, loading } = useSelector(
    (store) => store.myEvents,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyEventsList());
  }, [dispatch]);

  const filteredEvents = myEvent.filter(
    (event) => event.user_application_status === "not_applied",
  );
  const filteredEventsRegister = myEvent.filter(
    (event) =>
      event.user_application_status !== "not_applied" &&
      event.user_application_status !== "none",
  );
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <section className={style.title}>
          <h1>Мои мероприятия</h1>
        </section>
        <nav>
          <ActiveTabMyEvents />
        </nav>
        <main>
          {loading ? (
            <span>Загрузка данных....</span>
          ) : (
            activeTab === "Все" && (
              <div className={style.allEvents}>
                {filteredEvents.length === myEvent.length ? (
                  <span className={style.notApplied}>
                    Вы не зарегистрированы ни на одно мероприятие
                  </span>
                ) : (
                  filteredEventsRegister.map((event) => (
                    <EventCard
                      key={event.id}
                      title={event.name}
                      description={event.description}
                      date={event.date}
                      id={event.id}
                      img={event.logo}
                      info={event.specialization!.specialization}
                      time={event.time}
                      myEventBoolean={true}
                    />
                  ))
                )}
              </div>
            )
          )}
          {activeTab === "Избранные" && (
            <div className={style.allEvents}>
              {favouriteEvents.map((card) => (
                <EventCard
                  title={card.title}
                  img={card.img}
                  date={card.date}
                  info={card.info}
                  time={card.time}
                  id={card.id}
                  myEventBoolean={true}
                />
              ))}
            </div>
          )}
        </main>
        <div className={style.recomendation}>
          <section className={style.title}>
            <h2>Рекомендуем</h2>
          </section>
          <div className={style.allEvents}>
            {filteredEvents.slice(3, 6).map((event) => (
              <EventCard
                key={event.id}
                title={event.name}
                description={event.description}
                date={event.date}
                id={event.id}
                img={event.logo}
                info={event.specialization?.specialization}
                time={event.time}
                myEventBoolean={true}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
