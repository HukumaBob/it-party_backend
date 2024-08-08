import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/services/hooks.ts";
import {getEvent} from "../../app/services/slices/eventSlice";
import {closeModalSuccess} from "../../app/services/slices/applyRegistrationSlice";
import {EventPageView} from "../../entities/EventPageView";
import LoadingIcon from "../../app/assets/icons/loading.svg?react";
import ErrorIcon from "../../app/assets/icons/error.svg?react";
import {getCityList} from "../../app/services/slices/citySlice";

export const EventPage = () => {
  const dispatch = useAppDispatch();
  const {id} = useParams<{ id: string }>();
  const {loading, error} = useAppSelector(state => state.event)
  const {status: cityStatus} = useAppSelector((store) => store.city);

  useEffect(() => {
    if (cityStatus === 'idle' || cityStatus === 'error') {
      dispatch(getCityList())
    }
  }, [dispatch]);

  useEffect(() => {
    id && dispatch(getEvent(id))
  }, [dispatch, id]);

  useEffect(() => () => {
    // закрыть модалку если покидаем страницу
    dispatch(closeModalSuccess())
  }, [dispatch]);

  if (loading || cityStatus === 'loading') return <LoadingIcon className='loading-error-icon'/>
  if (error || cityStatus === 'error') return <ErrorIcon className='loading-error-icon'/>;
  return <EventPageView/>
};
