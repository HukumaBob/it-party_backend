import {useEffect} from "react";
import {useSelector} from "../../app/types/hooks";
import {useDispatch} from "../../app/types/hooks";
import {getSliderList} from "../../app/services/slices/sliderSlice";
import {SliderCards} from '../../entities/SliderCards'
import LoadingIcon from "../../app/assets/icons/loading.svg?react";
import ErrorIcon from "../../app/assets/icons/error.svg?react";

export const ContainerRecommended = () => {
  const {recommended, statusRecommended} = useSelector((store) => store.slider);
  const dispatch = useDispatch();

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