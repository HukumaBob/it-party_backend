import React from "react";
import style from "./index.module.scss";
import { ActiveTabBlock } from "../../shared/activeTab";
import { EventCard } from "../../shared/card";
import { useSelector } from "../../app/types/hooks";
export const AdminPage = () => {
  const { activeTab, archive } = useSelector((store) => store.admin);
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <section className={style.header}>
          <h1 className={style.title}>Мои мероприятия</h1>
          <button className={style.button}>Создать мероприятие</button>
        </section>
        <ActiveTabBlock />
        {activeTab === "Все" && (
          <div className={style.allEvents}>
            <EventCard
              title='InnoCode Conference'
              img=''
              date='29 февраля 2024'
              time='12:00'
              id={1}
              admin={true}
            />
            <EventCard
              title='Cloud Security Meetup'
              img=''
              date='29 февраля 2024'
              info='+3 Новых заявки'
              time='12:00'
              id={2}
              admin={true}
            />
            <EventCard
              title='Beats and Brews Novosib
              May Session'
              img=''
              date='29 февраля 2024'
              time='12:00'
              id={3}
              admin={true}
            />
            <EventCard
              title='Библиотека решений платформы данныхYandex Cloud'
              img=''
              date='29 февраля 2024'
              info='+3 Новых заявки'
              time='12:00'
              id={4}
              admin={true}
            />
          </div>
        )}
        {activeTab === "Архив" && (
          <div className={style.allEvents}>
            {archive.map((card) => (
              <EventCard
                title={card.title}
                img=''
                date={card.date}
                info={card.info}
                time={card.time}
                id={card.id}
                admin={card.admin}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
