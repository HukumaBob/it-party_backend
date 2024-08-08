import {useEffect} from "react";
import {useAppSelector} from "../../app/services/hooks.ts";
import {useAppDispatch} from "../../app/services/hooks.ts";
import {getSliderList} from "../../app/services/slices/sliderSlice";
import {SliderCards} from '../../entities/SliderCards'
import LoadingIcon from "../../app/assets/icons/loading.svg?react";
import ErrorIcon from "../../app/assets/icons/error.svg?react";

export const ContainerRecommended = () => {
  const {recommended, statusRecommended} = useAppSelector((store) => store.slider);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (statusRecommended === 'idle' || statusRecommended === 'error') {
      dispatch(getSliderList('recommended'));
    }
  }, [dispatch]);

  if (statusRecommended === 'loading') {
    return <LoadingIcon className='loading-error-icon'/>
  }
  if (statusRecommended === 'error') {
    return <ErrorIcon className='loading-error-icon'/>
  }

  return (
    <div className='slider-section'>
      <h2>Рекомендованные</h2>
      <SliderCards data={recommended}/>
    </div>
  );
};