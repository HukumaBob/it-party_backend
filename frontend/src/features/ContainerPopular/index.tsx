import {useAppDispatch, useAppSelector} from "../../app/services/hooks.ts";
import {SliderCards} from '../../entities/SliderCards'
import {useEffect} from "react";
import {getSliderList} from "../../app/services/slices/sliderSlice";
import LoadingIcon from "../../app/assets/icons/loading.svg?react";
import ErrorIcon from "../../app/assets/icons/error.svg?react";

export const ContainerPopular = () => {
  const {popular, statusPopular} = useAppSelector((store) => store.slider);
  const dispatch = useAppDispatch();

  useEffect(() => {
    statusPopular === 'idle' && dispatch(getSliderList('popular'));
  }, []);

  if (statusPopular === 'loading') {
    return <LoadingIcon className='loading-error-icon'/>
  }
  if (statusPopular === 'error') {
    return <ErrorIcon className='loading-error-icon'/>
  }

  return (
    <div className='slider-section'>
      <h2>Популярные</h2>
      <SliderCards data={popular}/>
    </div>
  );
};