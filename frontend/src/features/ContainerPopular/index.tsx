import {useDispatch, useSelector} from "../../app/types/hooks";
import {SliderCards} from '../../entities/SliderCards'
import {useEffect} from "react";
import {getSliderList} from "../../app/services/slices/sliderSlice";
import {ReactComponent as LoadingIcon} from "../../app/assets/icons/loading.svg";
import {ReactComponent as ErrorIcon} from "../../app/assets/icons/error.svg";

export const ContainerPopular = () => {
  const {popular, statusPopular} = useSelector((store) => store.slider);
  const dispatch = useDispatch();

  useEffect(() => {
    if (statusPopular === 'idle' || statusPopular === 'error') {
      dispatch(getSliderList('popular'));
    }
  }, [dispatch]);

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