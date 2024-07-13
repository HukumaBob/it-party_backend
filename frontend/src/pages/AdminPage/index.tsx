import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {useDispatch, useSelector} from "../../app/types/hooks";
import {getAdminEventList} from "../../app/services/slices/adminEventListSlice";
import {CardEventAdmin} from "../../entities/CardEventAdmin";
import {ReactComponent as LoadingIcon} from "../../app/assets/icons/loading.svg";
import {ReactComponent as ErrorIcon} from "../../app/assets/icons/error.svg";
import cn from 'classnames';
import style from "./index.module.scss";

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

export const AdminPage = () => {
  const dispatch = useDispatch();
  const {loading, error, allEvents, pastEvents, futureEvents} = useSelector(state => state.adminEvents);

  useEffect(() => {
    dispatch(getAdminEventList())
  }, [dispatch]);

  const [activeTab, setActiveTab] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <div className={cn(style.container, 'container')}>

      <div className={style.heading}>
        <h1 className={style.title}>Мероприятия</h1>
        <Link className={style.linkNewEvent} to='/admin/event/new'>Создать мероприятие</Link>
      </div>

      <div>
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
          <Tab label={<p>Все
            <b>{allEvents.length}</b></p>}
               {...a11yProps(0)}/>
          <Tab label={<p>Предстоящие
            <b>{futureEvents.length}</b></p>}
               {...a11yProps(1)}/>
          <Tab label={<p>Прошедшие
            <b>{pastEvents.length}</b></p>}
               {...a11yProps(2)}/>
          <Tab label={<p>Архив
            <b>{allEvents.length}</b></p>}
               {...a11yProps(2)}/>
        </Tabs>

        <TabPanel
          value={activeTab}
          index={0}
          loading={loading}
          error={Boolean(error)}
          length={allEvents.length}>
          {!loading && !error && allEvents.map((event) => <CardEventAdmin key={event.id} {...event} />)}
        </TabPanel>

        <TabPanel
          value={activeTab}
          index={1}
          loading={loading}
          error={Boolean(error)}
          length={futureEvents.length}
          message='Нет добавленных мероприятий'>
          {futureEvents.map((event) => <CardEventAdmin key={event.id} {...event} />)}
        </TabPanel>

        <TabPanel
          value={activeTab}
          index={2}
          loading={loading}
          error={Boolean(error)}
          length={pastEvents.length}>
          {pastEvents.map((event) => <CardEventAdmin key={event.id} {...event} />)}
        </TabPanel>

        <TabPanel
          value={activeTab}
          index={3}
          loading={loading}
          error={Boolean(error)}
          length={allEvents.length}>
          {allEvents.map((event) => <CardEventAdmin key={event.id} {...event} />)}
        </TabPanel>
      </div>

    </div>
  );
};
