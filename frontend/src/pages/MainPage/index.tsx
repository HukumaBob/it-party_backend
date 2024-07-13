import {useEffect} from "react";
import {useDispatch} from "../../app/types/hooks";
import {closeModalSuccess} from "../../app/services/slices/applyRegistrationSlice";
import {SliderCube} from '../../entities/SliderCube'
import {EventsCatalog} from "../../widgets/EventsCatalog";
import {QuestionAnswer} from "../../entities/QuestionAnswer";
import {ContainerPopular} from "../../features/ContainerPopular";
import {ContainerRecommended} from "../../features/ContainerRecomended";
import {SliderReview} from "../../entities/SliderReview";
import cn from 'classnames'
import style from "./index.module.scss";

export const MainPage = () => {
  const dispatch = useDispatch();
  useEffect(() => () => {
    // закрыть модалку если покидаем страницу
    dispatch(closeModalSuccess())
  }, [dispatch]);

  return (
    <div className={cn(style.container, 'container')}>
      <SliderCube/>
      <EventsCatalog/>
      <QuestionAnswer/>
      <ContainerPopular/>
      <ContainerRecommended/>
      <SliderReview/>
    </div>
  );
};
