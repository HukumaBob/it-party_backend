import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
import arrow_left from "../../app/assets/icons/arrow_left.svg";
import arrow_right from "../../app/assets/icons/arrow_right.svg";
import { SlideSwitcher } from "../../features/slideSwitcher";
import { Review } from "../../entities/review";
import user_photo1 from "../../app/assets/image/other/user_photo1.png";
import user_photo2 from "../../app/assets/image/other/user_photo2.png";
import user_photo3 from "../../app/assets/image/other/user_photo3.png";

export const Reviews = () => {
  const reviews = [
    {
      company: "TechTrends Symposium",
      description: "В.В. Пушкарь главный разработчик в стартапе «DataInsight»",
      text: "«Благодаря самым передовым технологическим трендам, вдохновляющим докладам и активным обсуждениям, самое ощущение в мероприятии было просто потрясающим. Мы получили ценные знания и инсайты, которые помогут нам сформировать нашу стратегию развития и реализовать наши амбициозные проекты. Большое спасибо организаторам за создание такого уникального и вдохновляющего опыта!»",
      image: user_photo1,
    },
    {
      company: "TechSphere Summit",
      description:
        "О.Е. Краснова директор офиса трансформации ПАО «Ростелеком»",
      text: "«Выражаю искреннюю признательность и благодарность за весомый вклад в организацию мероприятия. Особенно отмечаем высокое качество и своевременность оказанных услуг, клиентоориентированный подход в работе, технологичность, креативность и оперативность в решении задач, высокий профессионализм сотрудников, а также внимательное и дружелюбное отношение к заказчику. Считаем вас надёжным партнёром, способным добросовестно и самоотверженно решать самые сложные задачи»",
      image: user_photo2,
    },
    {
      company: "CodeMastermind Meetup",
      description:
        "Н.Г. Кушнир главный архитектор ведущего интернет-портала «DataHub»",
      text: "«CodeMastermind Meetup оказался невероятно ценным событием для нашей команды в DataHub. Встреча позволила нам глубже погрузиться в мир передовых технологий и разделять опыт с другими профессионалами в нашей области. Благодаря интересным докладам, обсуждениям и возможности обмена знаниями, мы получили новые идеи и перспективы для улучшения нашего интернет-портала. Это было истинным источником вдохновения и мотивации для нас, и мы с нетерпением ждём следующего мероприятия CodeMastermind Meetup».",
      image: user_photo3,
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIndex = (activeIndex + 1) % reviews.length;
      setActiveIndex(nextIndex);
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [activeIndex, reviews.length]);

  return (
    <div className={style.container}>
      <section>
        <h2 className={style.title}>Отзывы</h2>
      </section>
      <div className={style.reviewsBlock}>
        <img
          src={arrow_left}
          alt=''
          onClick={() =>
            handleClick(activeIndex > 0 ? activeIndex - 1 : reviews.length - 1)
          }
        />
        {reviews.map((el, index) => (
          <Review
            key={index}
            activeIndex={activeIndex}
            img={el.image}
            company={el.company}
            description={el.description}
            text={el.text}
            isActive={index === activeIndex}
          />
        ))}
        <img
          src={arrow_right}
          alt=''
          onClick={() => handleClick((activeIndex + 1) % reviews.length)}
        />
      </div>
      <div className={style.slider}>
        <SlideSwitcher
          activeIndex={activeIndex}
          handleClick={handleClick}
          length={reviews.length}
        />
      </div>
    </div>
  );
};
