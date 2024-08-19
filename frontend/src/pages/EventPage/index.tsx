import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/services/hooks.ts";
import {getEvent} from "../../app/services/slices/eventSlice";
import {EventPageView} from "../../entities/EventPageView";
import LoadingIcon from "../../app/assets/icons/loading.svg?react";
import ErrorIcon from "../../app/assets/icons/error.svg?react";
import {getCityList} from "../../app/services/slices/citySlice";

export const EventPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {id} = useParams<{ id: string }>();
  const {loading, error} = useAppSelector(state => state.event)
  const {status: cityStatus} = useAppSelector((store) => store.city);

  useEffect(() => {
    cityStatus === 'idle' && dispatch(getCityList())
    dispatch(getEvent(id!))
  }, []);

  useEffect(() => {
    if (typeof error === 'object' && error !== null && error.statusCode === 404) {
      navigate('not-found', {replace: true});
    }
  }, [error]);

  if (loading || cityStatus === 'loading') return <LoadingIcon className='loading-error-icon'/>
  // delayed - убирает моргание ошибки перед переходом на not-found
  if (error || cityStatus === 'error') return <ErrorIcon className='loading-error-icon delayed'/>;
  return <EventPageView/>
};
