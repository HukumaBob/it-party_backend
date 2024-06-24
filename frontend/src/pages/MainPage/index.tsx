import style from "./index.module.scss";
import { BannerSlider } from "../../widgets/BannerSlider";
import { EventsCatalog } from "../../widgets/EventsCatalog";
import { QuestionsBlock } from "../../widgets/QuestionsBlock";
import { CardBlock } from "../../widgets/CardBlock";
import { Reviews } from "../../widgets/Reviews";

export const MainPage = () => (
  <div className={style.wrapper}>
    <div className={style.container}>
      <BannerSlider />
      <EventsCatalog />
      <QuestionsBlock />
      <CardBlock title={"Популярные"} />
      <CardBlock title={"Рекомендуемые"} />
      <Reviews />
    </div>
  </div>
)
