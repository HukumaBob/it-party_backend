import React from "react";
import style from "./index.module.scss";
import speaker_1 from "../../app/assets/image/Speakers/speaker_1.png";
import speaker_2 from "../../app/assets/image/Speakers/speaker_2.png";
import speaker_3 from "../../app/assets/image/Speakers/speaker_3.png";
import speaker_4 from "../../app/assets/image/Speakers/speaker_4.png";
import speaker_1_reverse from "../../app/assets/image/Speakers/speaker_1_reverse.png";
import speaker_2_reverse from "../../app/assets/image/Speakers/speaker_2_reverse.png";
import speaker_3_reverse from "../../app/assets/image/Speakers/speaker_3_reverse.png";
import speaker_4_reverse from "../../app/assets/image/Speakers/speaker_4_reverse.png";
import { Speaker } from "../../entities/speaker";

export const Speakers = () => {
  return (
    <div className={style.container}>
      <h2 className={style.title}>Докладчики</h2>
      <div className={style.speakers}>
        <Speaker img={speaker_1} imgReverse={speaker_1_reverse} />
        <Speaker img={speaker_2} imgReverse={speaker_2_reverse} />
        <Speaker img={speaker_3} imgReverse={speaker_3_reverse} />
        <Speaker img={speaker_4} imgReverse={speaker_4_reverse} />
      </div>
    </div>
  );
};
