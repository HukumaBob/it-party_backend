import {NavLink} from "react-router-dom";
import LogoIcon from "../../app/assets/icons/logo_text.svg?react";
import VKIcon from "../../app/assets/icons/vkontakte.svg?react";
import RutubeIcon from "../../app/assets/icons/rutube.svg?react";
import TelegramIcon from "../../app/assets/icons/telegram.svg?react";
import style from "./index.module.scss";

export const Footer = () => {
  const activeClassName = ({isActive}: { isActive: boolean }) => (isActive ? style.active : '')

  return (
    <footer className={style.footer}>
      <div className='container'>
        <div className={style.container}>

          <div className={style.row}>
            <LogoIcon className={style.logo}/>
            <nav className={style.nav}>
              <NavLink className={activeClassName} to='/'>Политика конфиденциальности</NavLink>
              <NavLink className={activeClassName} to='/'>Правила использования</NavLink>
              <NavLink className={activeClassName} to='/'>Помощь</NavLink>
            </nav>
            <div className={style.socials}>
              <h2>Следите за нашими новостями</h2>
              <nav>
                <a href="https://google.com"><VKIcon/></a>
                <a href="https://google.com"><RutubeIcon/></a>
                <a href="https://google.com"><TelegramIcon/></a>
              </nav>
            </div>
          </div>

          <p className={style.description}>
            На информационном ресурсе itParty.ru применяются рекомендательные
            технологии (информационные технологии предоставления информации
            на основе сбора, систематизации и анализа сведений, относящихся
            к предпочтениям пользователей сети «Интернет», находящихся
            на территории Российской Федерации) © 2024 ООО «ИТ Пати».
          </p>
          <a className={style.phone} href="tel:88002343500">8 800 234-35-00</a>
        </div>
      </div>
    </footer>
  );
};
