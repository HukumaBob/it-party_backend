import React, {useEffect} from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {useDispatch, useSelector} from "../../app/types/hooks";
import {getMyEventsList} from "../../app/services/slices/myEventsSlice";
import {getFavoriteList} from "../../app/services/slices/favoriteSlice";
import {closeModalSuccess} from "../../app/services/slices/applyRegistrationSlice";
import {CardEvent} from "../../entities/CardEvent";
import {ContainerRecommended} from "../../features/ContainerRecomended";
import LoadingIcon from "../../app/assets/icons/loading.svg?react";
import ErrorIcon from "../../app/assets/icons/error.svg?react";
import style from './index.module.scss'

type TabPanelProps = {
  children: React.ReactNode;
  index: number;
  value: number;
  loading: boolean;
  error: boolean;
  length: number;
  message?: string;
}

const TabPanel = ({children, value, index, loading, error, length, message, ...other}: TabPanelProps) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`event-tab-panel-${index}`}
    aria-labelledby={`event-tab-${index}`}
    {...other}
  >
    {loading && <LoadingIcon className='loading-error-icon'/>}
    {error && <ErrorIcon className='loading-error-icon'/>}
    {!loading && !error && length === 0 && <p className='no-events'>{message || 'Нет мероприятий'}</p>}
    <div className='event-cards-container'>
      {children}
    </div>
  </div>
);

const a11yProps = (index: number) => ({
  id: `event-tab-${index}`,
  'aria-controls': `event-tab-panel-${index}`,
});

export const ProfileEvents = () => {
  const dispatch = useDispatch();
  const {
    loading: favoriteLoading,
    error: favoriteError,
    data: favoriteData,
    favorite: favoriteList
  } = useSelector((state) => state.favorite);
  const {
    loading: myEventsLoading,
    error: myEventsError,
    allEvents,
    pastEvents,
    futureEvents,
  } = useSelector((state) => state.myEvents);

  const [activeTab, setActiveTab] = React.useState(0);
  const handleChange = (_: any, newValue: number) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    dispatch(getMyEventsList());
    dispatch(getFavoriteList())
  }, [dispatch]);

  useEffect(() => {
    if (!favoriteLoading) {
      const id = setTimeout(() => dispatch(getFavoriteList()), 1200)
      return () => clearTimeout(id)
    }
  }, [favoriteList]);

  useEffect(() => () => {
    // закрыть модалку если покидаем страницу
    dispatch(closeModalSuccess())
  }, [dispatch]);

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
          <b>{futureEvents.length}</b></p>}
             {...a11yProps(0)}/>
        <Tab label={<p>Избранные
          <b>{favoriteData.length}</b></p>}
             {...a11yProps(1)}/>
        <Tab label={<p>Прощедшие
          <b>{pastEvents.length}</b></p>}
             {...a11yProps(2)}/>
        <Tab label={<p>Все
          <b>{allEvents.length}</b></p>}
             {...a11yProps(2)}/>
      </Tabs>

      <TabPanel
        value={activeTab}
        index={0}
        loading={myEventsLoading}
        error={Boolean(myEventsError)}
        length={futureEvents.length}>
        {futureEvents.map((event) => <CardEvent key={event.id} {...event} />)}
      </TabPanel>

      <TabPanel
        value={activeTab}
        index={1}
        loading={favoriteLoading}
        error={Boolean(favoriteError)}
        length={favoriteData.length}
        message='Нет добавленных мероприятий'>
        {favoriteData.map((event) => <CardEvent key={event.id} {...event} />)}
      </TabPanel>

      <TabPanel
        value={activeTab}
        index={2}
        loading={myEventsLoading}
        error={Boolean(myEventsError)}
        length={pastEvents.length}>
        {pastEvents.map((event) => <CardEvent key={event.id} {...event} />)}
      </TabPanel>

      <TabPanel
        value={activeTab}
        index={3}
        loading={myEventsLoading}
        error={Boolean(myEventsError)}
        length={allEvents.length}>
        {allEvents.map((event) => <CardEvent key={event.id} {...event} />)}
      </TabPanel>

      <div className={style.recommendedContainer}>
        <ContainerRecommended/>
      </div>
    </div>
  );
};
