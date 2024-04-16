import React from "react";
import banner from "../../app/assets/image/other/adminBanner.png";
import style from "./index.module.scss";
import { EventsTable } from "../../shared/eventsApplicationTable";
import { useDispatch, useSelector } from "../../app/types/hooks";
import close from "../../app/assets/icons/close_mini.svg";
import {
  deleteRefusal,
  setStatus,
} from "../../app/services/slices/adminPageSlice";
export const NewApplicationPage = () => {
  const { refusals, inputValues } = useSelector((store) => store.admin);
  const handleStatus = (userId: number, value: string) => {
    dispatch(setStatus({ userId, value }));
  };
  const dispatch = useDispatch();
  return (
    <div className={style.wrapper}>
      <div className={style.banner}>
        <img src={banner} alt='banner' />
      </div>
      <div className={style.container}>
        <section className={style.title}>
          <h2>Cloud Security Meetup, 4 апреля 2024, Москва, Мулен Руж</h2>
        </section>
        <div className={style.eventApplication}>
          <section className={style.title}>
            <h2>Заявки на участие в мероприятии</h2>
          </section>
          <EventsTable />
        </div>
        <div className={style.refusals}>
          <section className={style.title}>
            <h2>Отказы</h2>
          </section>
          {refusals.map((el, index) => (
            <p key={index} className={style.refusal}>
              <span className={style.name}>{el.name}</span>
              <span className={style.inputValues}>{inputValues[el.id]}</span>
              <img
                src={close}
                alt='iconClose'
                onClick={() => {
                  dispatch(deleteRefusal(el.id));
                  handleStatus(el.id, "Ожидает");
                }}
              />
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
