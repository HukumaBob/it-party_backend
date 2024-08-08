import {useEffect} from 'react';
import useMediaQuery from '@mui/material/useMediaQuery'
import {FiltersBlock} from "../FiltersBlock";
import {CardEvent} from "../../entities/CardEvent";
import {useAppDispatch, useAppSelector} from "../../app/services/hooks.ts";
import {getEventList, setEventListPageNumber, setPageLimit} from "../../app/services/slices/eventListSlice";
import {getSpecializationsList} from "../../app/services/slices/specializationsSlice";
import {getCityList} from "../../app/services/slices/citySlice";
import {Pagination} from "../../shared/Pagination";
import LoadingIcon from "../../app/assets/icons/loading.svg?react";
import ErrorIcon from "../../app/assets/icons/error.svg?react";
import style from "./index.module.scss";

export const EventsCatalog = () => {
  const dispatch = useAppDispatch();
  const {data, loading: eventsLoading, error, filters, pageNumber, pageCount} = useAppSelector((store) => store.eventList);
  const {status: cityStatus} = useAppSelector((store) => store.city);
  const {status: specializationsStatus} = useAppSelector((store) => store.specializations);
  const isPhoneSM = useMediaQuery('(max-width: 576px)')
  const isTablet = useMediaQuery('(min-width: 991.98px)')

  useEffect(() => {
    const limit = isTablet ? 12 : isPhoneSM ? 8 : 10
    dispatch(setPageLimit(limit))
  }, [dispatch, isTablet, isPhoneSM]);

  useEffect(() => {
    dispatch(getEventList())
    // кнопки пагинатора, инпутов, селекта - обновляют объект filters в store
    // что вызывает срабатывание useEffect за счет - [filters]
    // и запускается getEventList()
  }, [dispatch, filters]);

  useEffect(() => {
    cityStatus === 'idle' && dispatch(getCityList())
    specializationsStatus === 'idle' && dispatch(getSpecializationsList())
  }, [dispatch]);

  const handlePageChange = (_: any, value: number) => {
    dispatch(setEventListPageNumber(value))
  };

  return (
    <div className={style.container}>

      <FiltersBlock/>

      {eventsLoading && <LoadingIcon className='loading-error-icon'/>}
      {error && <ErrorIcon className='loading-error-icon'/>}
      {!eventsLoading && !error && data.length === 0 && <p className='no-events'>Нет зарегистрированных мероприятий</p>}

      <div className='event-cards-container'>
        {data.map(card => <CardEvent key={card.id} {...card}/>)}
      </div>

      {pageCount > 1 &&
        <Pagination
          pageCount={pageCount}
          pageNumber={pageNumber}
          handlePageChange={handlePageChange}/>
      }

    </div>
  );
};
