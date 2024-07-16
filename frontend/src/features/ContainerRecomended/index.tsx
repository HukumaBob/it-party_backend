import {useEffect} from "react";
import {useSelector} from "../../app/types/hooks";
import {useDispatch} from "../../app/types/hooks";
import {getSliderList} from "../../app/services/slices/sliderSlice";
import {SliderCards} from '../../entities/SliderCards'
import {ReactComponent as LoadingIcon} from "../../app/assets/icons/loading.svg";
import {ReactComponent as ErrorIcon} from "../../app/assets/icons/error.svg";

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