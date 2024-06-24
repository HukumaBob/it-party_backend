import React from "react";
import style from "./index.module.scss";
import fullLogo from "../../app/assets/icons/fullLogo.svg";
import vk from "../../app/assets/icons/vk_black.svg";
import rutube from "../../app/assets/icons/rutube_black.svg";
import tg from "../../app/assets/icons/telegram_black.svg";

export const Footer = () => {
  return (
    <footer className={style.wrapper}>
      <div className={style.container}>
        <img src={fullLogo} alt='logo' className={style.logo} />
        <ul className={style.list}>
          <li>Политика конфиденциальности</li>
          <li>Правила использования</li>
          <li>Помощь</li>
        </ul>
        <div className={style.news}>
          <span className={style.news_text}>Следите за нашими новостями</span>
          <div className={style.news_img}>
            <img src={vk} alt='VK' />
            <img src={rutube} alt='RuTube' />
            <img src={tg} alt='Telegram' />
          </div>
        </div>
      </div>
      <div className={style.descripton}>
        <p>
          На информационном ресурсе itParty.ru применяются рекомендательные
          технологии (информационные технологии предоставления информации
          на основе сбора, систематизации и анализа сведений, относящихся
          к предпочтениям пользователей сети «Интернет», находящихся
          на территории Российской Федерации) © 2024 ООО «ИТ Пати».
          8 800 234-35-00
        </p>
      </div>
    </footer>
  );
};
