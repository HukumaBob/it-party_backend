import React from "react";
import style from "./index.module.scss";
import arrow_down from "../../app/assets/icons/arrow_down.svg";
export const QuestionsBlock = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <section>
          <h2 className={style.title}>Частые вопросы</h2>
        </section>
        <div className={style.questionsContainer}>
          <p className={style.question}>
            <span className={style.text}>
              Нужно ли регистрироваться, чтобы посмотреть трансляцию?
            </span>
            <img src={arrow_down} alt='arrow_down' />
          </p>
          <p className={style.question}>
            <span className={style.text}>
              Нужно ли регистрироваться, чтобы посмотреть трансляцию?
            </span>
            <img src={arrow_down} alt='arrow_down' />
          </p>
          <p className={style.question}>
            <span className={style.text}>
              Нужно ли регистрироваться, чтобы посмотреть трансляцию?
            </span>
            <img src={arrow_down} alt='arrow_down' />
          </p>
          <p className={style.question}>
            <span className={style.text}>
              Нужно ли регистрироваться, чтобы посмотреть трансляцию?
            </span>
            <img src={arrow_down} alt='arrow_down' />
          </p>
          <p className={style.question}>
            <span className={style.text}>
              Нужно ли регистрироваться, чтобы посмотреть трансляцию?
            </span>
            <img src={arrow_down} alt='arrow_down' />
          </p>
          <p className={style.question}>
            <span className={style.text}>
              Нужно ли регистрироваться, чтобы посмотреть трансляцию?
            </span>
            <img src={arrow_down} alt='arrow_down' />
          </p>
          <span>
            Если у вас остались вопросы — напишите нам в разделе «Помощь».
          </span>
        </div>
      </div>
    </div>
  );
};
