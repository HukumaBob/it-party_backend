import React from "react";
import style from "./index.module.scss";
import { RegistrationButton } from "../RegistrationButton";
export const MainTextEvents = () => {
  return (
    <div>
      <div className={style.mainText}>
        <h2 className={style.title}>
          Cloud Security Meetup, 25 апреля 2024, Москва, Мулен Руж
        </h2>
        <div className={style.discription}>
          <div className={style.paragraph}>
            <span>
              25 апреля приглашаем на неформальную встречу Cloud Security
              Meetup 2024. Вместе с экспертами Yandex Cloud поговорим про
              технические аспекты безопасности в облаке.
            </span>
            <ul className={style.list}>
              Обсудим подробно:
              <li>
                работу с событиями: как обрабатывать семантику логов
                в неизвестном формате со скоростью 100 МБ/с на ядро;
              </li>
              <li>
                {" "}
                Remote Code Execution: на каких этапах и с помощью каких
                инструментов можно обнаружить разные фазы атаки;
              </li>
              <li>защиту приложений от DDoS-атак, ботов и фрода.</li>
            </ul>
          </div>
          <p className={style.info}>
            Встреча будет полезна специалистам по информационной безопасности.
            В том числе разработчикам и инженерам, которые работают с AppSec
            и Security Operations Center (SOC), и всем, кто интересуется
            информационной безопасностью в облаке.
          </p>
          <div className={style.warning}>
            <p>
              Участие бесплатное, количество мест ограничено вместимостью
              площадки.
              <span>Будет онлайн-трансляция.</span>
            </p>
            <div className={style.button}>
              <RegistrationButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
