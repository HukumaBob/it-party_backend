import {SliderCube} from '../../entities/SliderCube'
import {EventsCatalog} from "../../widgets/EventsCatalog";
import {QuestionAnswer} from "../../entities/QuestionAnswer";
import {ContainerPopular} from "../../features/ContainerPopular";
import {ContainerRecommended} from "../../features/ContainerRecomended";
import {SliderReview} from "../../entities/SliderReview";
import cn from 'classnames'
import style from "./index.module.scss";

export const MainPage = () => (
  <div className={cn(style.container, 'container')}>
    <SliderCube/>
    <EventsCatalog/>
    <QuestionAnswer/>
    <ContainerPopular/>
    <ContainerRecommended/>
    <SliderReview/>
  </div>
);
