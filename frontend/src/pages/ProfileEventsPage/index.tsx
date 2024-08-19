import React, {useEffect} from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import useMediaQuery from "@mui/material/useMediaQuery";
import {useAppDispatch, useAppSelector} from "../../app/services/hooks.ts";
import {
  getProfileEventList,
  setProfileEventListPageNumber,
  setProfileEventListLimit
} from "../../app/services/slices/profileEventListSlice.ts";
import {getFavoriteList, setFavoriteLimit, setFavoritePageNumber} from "../../app/services/slices/favoriteSlice";
import {CardEvent} from "../../entities/CardEvent";
import {Pagination} from "../../shared/Pagination";
import {ContainerRecommended} from "../../features/ContainerRecomended";
import LoadingIcon from "../../app/assets/icons/loading.svg?react";
import ErrorIcon from "../../app/assets/icons/error.svg?react";
import style from './index.module.scss';

type TProps = {
  value: number;
  index: number;
  type: 'future' | 'past' | 'all';
};

const TabPanel: React.FC<TProps> = ({value, index, type, ...other}) => {
  const dispatch = useAppDispatch();
  const {data, status, count, pageCount, pageNumber, limit} = useAppSelector(state => state.profileEventList);
  const loading = status[type] === 'loading';
  const error = status[type] === 'error';
  const isTablet = useMediaQuery('(min-width: 991.98px)');

  useEffect(() => {
    const limit = isTablet ? 3 : 2;
    dispatch(setProfileEventListLimit(limit));
  }, [isTablet]);

  useEffect(() => {
    dispatch(getProfileEventList('all'));
  }, [pageNumber.all, limit]);
  useEffect(() => {
    dispatch(getProfileEventList('past'));
  }, [pageNumber.past, limit]);
  useEffect(() => {
    dispatch(getProfileEventList('future'));
  }, [pageNumber.future, limit]);

  const handlePageChange = (_: any, pageNumber: number) => {
    dispatch(setProfileEventListPageNumber({type, pageNumber}))
  };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`event-tab-panel-${index}`}
      aria-labelledby={`event-tab-${index}`}
      {...other}
    >
      {loading && <LoadingIcon className='loading-error-icon'/>}
      {error && <ErrorIcon className='loading-error-icon'/>}
      {!loading && !error && count[type] === 0 && <p className='no-events'>Нет мероприятий</p>}
      <div className='event-cards-container'>
        {data[type].map((event) => <CardEvent key={event.id} {...event} />)}
      </div>
      <div className={style.paginationContainer}>
        {pageCount[type] > 1 &&
          <Pagination
            pageCount={pageCount[type]}
            pageNumber={pageNumber[type]}
            handlePageChange={handlePageChange}/>
        }
      </div>
    </div>
  );
};

type TPropsFavorite = { value: number; index: number };

const TabPanelFavorite: React.FC<TPropsFavorite> = ({value, index, ...other}) => {
  const dispatch = useAppDispatch();
  const {
    loading,
    error,
    data,
    favorite,
    pageNumber,
    pageCount,
    offset,
    limit
  } = useAppSelector(state => state.favorite);

  const isTablet = useMediaQuery('(min-width: 991.98px)');
  useEffect(() => {
    const limit = isTablet ? 3 : 2;
    dispatch(setFavoriteLimit(limit));
  }, [isTablet]);

  useEffect(() => {
    data.length < Object.keys(favorite).length && dispatch(getFavoriteList());
  }, [data, favorite]);

  const handlePageChange = (_: any, pageNumber: number) => {
    dispatch(setFavoritePageNumber(pageNumber))
  };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`event-tab-panel-${index}`}
      aria-labelledby={`event-tab-${index}`}
      {...other}
    >
      {loading && <LoadingIcon className='loading-error-icon'/>}
      {error && <ErrorIcon className='loading-error-icon'/>}
      {!loading && !error && data.length === 0 && <p className='no-events'>Нет мероприятий</p>}
      <div className='event-cards-container'>
        {data.slice(offset, offset + limit).map((event) => <CardEvent key={event.id} {...event} />)}
      </div>
      <div className={style.paginationContainer}>
        {pageCount > 1 &&
          <Pagination
            pageCount={pageCount}
            pageNumber={pageNumber}
            handlePageChange={handlePageChange}/>
        }
      </div>
    </div>
  );
};

const a11yProps = (index: number) => ({
  id: `event-tab-${index}`,
  'aria-controls': `event-tab-panel-${index}`,
});

export const ProfileEvents = () => {
  const dispatch = useAppDispatch();
  const {favorite} = useAppSelector((state) => state.favorite);
  const {status, count} = useAppSelector((state) => state.profileEventList);

  const [activeTab, setActiveTab] = React.useState(0);
  const handleChange = (_: any, newValue: number) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    status.all === 'idle' && dispatch(getProfileEventList('all'));
    status.past === 'idle' && dispatch(getProfileEventList('past'));
    status.future === 'idle' && dispatch(getProfileEventList('future'));
    dispatch(getFavoriteList())
  }, []);

  return (
    <div className='container'>
      <h1 className={style.title}>Мои мероприятия</h1>

      <Tabs
        className='tab-header'
        value={activeTab}
        onChange={handleChange}
        aria-label="event-tabs"
        sx={{
          '.MuiTab-root': {
            fontFamily: 'YS-Text',
            color: 'var(--c-def-black)',
            fontWeight: 400
          },
          '.Mui-selected': {color: 'var(--c-def-blue)'},
          '.MuiTabs-indicator': {backgroundColor: 'var(--c-def-blue)'},
          '.MuiButtonBase-root': {
            '@media (max-width: 767.98px)': {
              padding: '10px 12px',
            },
            '@media (max-width: 575.98px)': {
              padding: '8px',
              minWidth: 'unset',
              fontSize: '2.7vw',
            }
          }
        }}>
        <Tab label={<p>Предстоящие
          <b>{count.future}</b></p>}
             {...a11yProps(0)}/>
        <Tab label={<p>Избранные
          <b>{Object.keys(favorite).length}</b></p>}
             {...a11yProps(1)}/>
        <Tab label={<p>Прощедшие
          <b>{count.past}</b></p>}
             {...a11yProps(2)}/>
        <Tab label={<p>Все
          <b>{count.all}</b></p>}
             {...a11yProps(3)}/>
      </Tabs>

      <TabPanel value={activeTab} index={0} type='future'/>
      <TabPanelFavorite value={activeTab} index={1}/>
      <TabPanel value={activeTab} index={2} type='past'/>
      <TabPanel value={activeTab} index={3} type='all'/>

      <div className={style.recommendedContainer}>
        <ContainerRecommended/>
      </div>
    </div>
  );
};
