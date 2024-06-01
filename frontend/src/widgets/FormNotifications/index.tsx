import React, { useState} from "react";
import style from "./index.module.scss";
import { useDispatch, useSelector } from "../../app/types/hooks";
import checkIcon from "../../app/assets/icons/check_mini.svg";
import arrow_down from "../../app/assets/icons/arrow_down.svg";
import {
  setEmailChecked,
  setSmsChecked,
  setApprovalApplicationChecked,
  setNewEventsChecked,
  setSelectedTimeInterval,
  setClickTimeInterval,
} from "../../app/services/slices/profileSlice";

export const FormNotifications = () => {
  const dispatch = useDispatch();
  const [isActiveFilter, setActiveFilter] = useState<boolean>(true);
  const {
    clickTimeInterval,
    smsChecked,
    emailChecked,
    approvalApplicationChecked,
    newEventsChecked,
    selectedTimeInterval,
    selectedNavNotification,
  } = useSelector((state) => state.profile);

  const handleEmailChange = () => {
    dispatch(setEmailChecked(!emailChecked));
  };

  const handleSmsChange = () => {
    dispatch(setSmsChecked(!smsChecked));
  };

  const handleApprovalApplicationChange = () => {
    dispatch(setApprovalApplicationChecked(!approvalApplicationChecked));
  }

  const handleNewEvents = () => {
    dispatch(setNewEventsChecked(!newEventsChecked));
  }

  const handleOptionsClickTimeInterval = (value: number) => {
    dispatch(setSelectedTimeInterval(value));
    dispatch(setClickTimeInterval(false));
  }

  const handleClickTimeInterval = () => {
    dispatch(setClickTimeInterval(!clickTimeInterval));
  }

  const handleActiveFilter = () => {
    const status = !isActiveFilter;
    setActiveFilter(status);
  }

  const handleSubmit = () => {
    const data = {};
  }

  return (
    <form className={selectedNavNotification ? style.formSection : style.formSectionHide} onSubmit={handleSubmit} id="#formNotifications" noValidate>
      <h2 className={style.form_title}>Настройка уведомлений</h2>
      <div className={style.filterCheckbox}>
        <h3 className={style.filteCheckbox_subtitle}>Уведомления</h3>
        <label className={style.filterCheckbox_toggle}>
          <input type="checkbox" className={style.filterCheckbox_input} name="filter" onChange={handleActiveFilter}/>
          <span className={style.filterCheckbox_slider}></span>
        </label>
      </div>
      <div className={isActiveFilter ? style.notificationsBlock : style.notificationsBlockHide}>
        <div className={style.element}>
          <div className={style.element_checkboxBlock}>
            <div className={style.container_checkbox}>
              <div className={style.customCheckBox} onClick={handleEmailChange}>
                {emailChecked ? <img src={checkIcon} alt='check' /> : ""}
              </div>
              <span>Email</span>
            </div>
            <div className={style.container_checkbox}>
              <div className={style.customCheckBox} onClick={handleSmsChange}>
                {smsChecked ? <img src={checkIcon} alt='check' /> : ""}
              </div>
              <span>СМС-уведомления</span>
            </div>
          </div>
        </div>
        <div className={style.element}>
          <div className={style.element_checkboxBlock}>
            <h3 className={style.element_subtitle}>
              Уведомлять меня
            </h3>
            <div className={style.container_checkbox}>
              <div className={style.customCheckBox} onClick={handleApprovalApplicationChange}>
                {approvalApplicationChecked ? <img src={checkIcon} alt='check' /> : ""}
              </div>
              <span>Одобрение заявки</span>
            </div>
            <div className={style.container_checkbox}>
              <div className={style.customCheckBox} onClick={handleNewEvents}>
                {newEventsChecked ? <img src={checkIcon} alt='check' /> : ""}
              </div>
              <span>Новые мероприятия</span>
            </div>
          </div>  
        </div>
        <div className={style.element}>
          <div className={style.container_selectInput}>
            <label>
              Предстоящие мероприятия
            </label>
            <div className={style.customSelect} onClick={handleClickTimeInterval}>
              <span>{(selectedTimeInterval === 0 && "Всегда") ||
                     (selectedTimeInterval === 1 && "За час") ||
                     (selectedTimeInterval === 2 && "За 2 часа") ||
                     (selectedTimeInterval === 3 && "За день") ||
                     (selectedTimeInterval === 4 && "За неделю") ||
                     (selectedTimeInterval === 5 && "Никогда")}
              </span>
              <img src={arrow_down} alt='arrow' />
            </div>
            {clickTimeInterval && (
              <div className={style.options}>
                <div
                  className={style.option}
                  onClick={() => handleOptionsClickTimeInterval(1)}>
                  За час
                </div>
                <div
                  className={style.option}
                  onClick={() => handleOptionsClickTimeInterval(2)}>
                  За 2 часа
                </div>
                <div
                  className={style.option}
                  onClick={() => handleOptionsClickTimeInterval(3)}>
                  За день
                </div>
                <div
                  className={style.option}
                  onClick={() => handleOptionsClickTimeInterval(4)}>
                  За неделю
                </div>
                <div
                  className={style.option}
                  onClick={() => handleOptionsClickTimeInterval(5)}>
                  Никогда
                </div>
              </div>
            )}
          </div>  
        </div>        
      </div>
      <div className={style.buttonBlock}>
        <button
          type='submit'
          className={
            style.submit
          }>
          Сохранить
        </button>
      </div>
    </form>
  );
};