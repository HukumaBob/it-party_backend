import {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "../../app/types/hooks";
import checkIcon from "../../app/assets/icons/check_mark.svg";
import arrow_down from "../../app/assets/icons/arrow_down.svg";
import {
  setEmailChecked,
  setSmsChecked,
  setApprovalApplicationChecked,
  setNewEventsChecked,
  setSelectedTimeInterval,
  setClickTimeInterval,
} from "../../app/services/slices/profileSlice";
import {TFormDataPersonalValues, TUserProfileValues} from "../../app/types/types";
import {editingDataPersonal} from "../../app/api/api";
import style from "./index.module.scss";

export const FormNotifications = () => {
  const dispatch = useDispatch();
  const {
    clickTimeInterval,
    smsChecked,
    emailChecked,
    approvalApplicationChecked,
    newEventsChecked,
    selectedTimeInterval,
  } = useSelector((state) => state.profile);

  const [isActiveFilter, setActiveFilter] = useState<boolean>((selectedTimeInterval !== 5) ? true : false);

  useEffect(() => {
    let checkboxNew = document.querySelector('input[type="checkbox"]');
    if (checkboxNew !== null) {
      const attributeFilterActive = checkboxNew.hasAttribute('checked');
      if (selectedTimeInterval !== 5 && isActiveFilter === true && attributeFilterActive === false) {
        checkboxNew.setAttribute('checked', 'true');
      }
    }
  }, []);

  const {
    handleSubmit,
    setValue,
  } = useForm<TFormDataPersonalValues>({
    mode: "onTouched",
  });

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
    setValue("notification", value);
  }

  const handleClickTimeInterval = () => {
    dispatch(setClickTimeInterval(!clickTimeInterval));
  }

  const handleActiveFilter = () => {
    let checkboxNew = document.querySelector('input[type="checkbox"]');
    const status = !isActiveFilter;
    setActiveFilter(status);
    if (checkboxNew !== null) {
      if (status) {
        checkboxNew.setAttribute('checked', 'true');
        dispatch(setSelectedTimeInterval(0));
      } else {
        checkboxNew.removeAttribute('checked');
        dispatch(setSelectedTimeInterval(5));
      }
    }
  }

  const onSubmit = (data: TFormDataPersonalValues) => {
    let dataNew: TFormDataPersonalValues = {}
    if (isActiveFilter === true && data.notification !== undefined) {
      editingDataPersonal(data)
        .then((data: TUserProfileValues) => {
          localStorage.setItem("updateInfo", JSON.stringify(data));
          dispatch(setSelectedTimeInterval(data.notification));
          alert(
            "Данные успешно обновлены.",
          );
        })
        .catch((error) => {
          console.log(error);
          alert("Произошла ошибка при отправке формы. Попробуйте еще раз позже.");
        })
    } else if (isActiveFilter === true && data.notification === undefined) {
      if (selectedTimeInterval === 5) {
        dataNew.notification = 0;
        editingDataPersonal(dataNew)
          .then((data: TUserProfileValues) => {
            localStorage.setItem("updateInfo", JSON.stringify(data));
            dispatch(setSelectedTimeInterval(data.notification));
            alert(
              "Данные успешно обновлены.",
            );
          })
          .catch((error) => {
            console.log(error);
            alert("Произошла ошибка при отправке формы. Попробуйте еще раз позже.");
          })
      } else {
        alert(
          "Нет текущих изменений."
        );
      }
    } else if (isActiveFilter === false && data.notification !== undefined) {
      dataNew = data;
      dataNew.notification = 5;
      editingDataPersonal(dataNew)
        .then((data: TUserProfileValues) => {
          localStorage.setItem("updateInfo", JSON.stringify(data));
          dispatch(setSelectedTimeInterval(data.notification));
          alert(
            "Данные успешно обновлены.",
          );
        })
        .catch((error) => {
          console.log(error);
          alert("Произошла ошибка при отправке формы. Попробуйте еще раз позже.");
        })
    } else if (isActiveFilter === false && data.notification === undefined) {
      if (selectedTimeInterval !== 5) {
        dataNew.notification = 5;
        editingDataPersonal(dataNew)
          .then((data: TUserProfileValues) => {
            localStorage.setItem("updateInfo", JSON.stringify(data));
            dispatch(setSelectedTimeInterval(data.notification));
            alert(
              "Данные успешно обновлены.",
            );
          })
          .catch((error) => {
            console.log(error);
            alert("Произошла ошибка при отправке формы. Попробуйте еще раз позже.");
          })
      } else {
        alert(
          "Нет текущих изменений."
        );
      }
    }
  }

  return (
    <form className={style.formSection} onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className={style.form_title}>Настройка уведомлений</h2>

      <div className={style.filterCheckbox}>
        <h3 className={style.filteCheckbox_subtitle}>Уведомления</h3>
        <label className={style.filterCheckbox_toggle}>
          <input type="checkbox" className={style.filterCheckbox_input} id="filter" name="filter"
                 onClick={handleActiveFilter}/>
          <span className={style.filterCheckbox_slider}></span>
        </label>
      </div>

      <div className={isActiveFilter ? style.notificationsBlock : style.notificationsBlockHide}>
        <div className={style.element}>
          <div className={style.element_checkboxBlock}>
            <div className={style.container_checkbox}>
              <div className={style.customCheckBox} onClick={handleEmailChange}>
                {emailChecked ? <img src={checkIcon} alt='check'/> : ""}
              </div>
              <span>Email</span>
            </div>
            <div className={style.container_checkbox}>
              <div className={style.customCheckBox} onClick={handleSmsChange}>
                {smsChecked ? <img src={checkIcon} alt='check'/> : ""}
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
                {approvalApplicationChecked ? <img src={checkIcon} alt='check'/> : ""}
              </div>
              <span>Одобрение заявки</span>
            </div>
            <div className={style.container_checkbox}>
              <div className={style.customCheckBox} onClick={handleNewEvents}>
                {newEventsChecked ? <img src={checkIcon} alt='check'/> : ""}
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
              <span>{(selectedTimeInterval === 1 && "За час") ||
                (selectedTimeInterval === 2 && "За 2 часа") ||
                (selectedTimeInterval === 3 && "За день") ||
                (selectedTimeInterval === 4 && "За неделю") ||
                (selectedTimeInterval === 5 && "Никогда") ||
                (selectedTimeInterval === 0 && "")}
              </span>
              <img src={arrow_down} alt='arrow'/>
            </div>
            {clickTimeInterval && (
              <div className={style.options}>
                <div
                  className={selectedTimeInterval !== 1 ? style.option : style.optionHide}
                  onClick={() => handleOptionsClickTimeInterval(1)}>
                  За час
                </div>
                <div
                  className={selectedTimeInterval !== 2 ? style.option : style.optionHide}
                  onClick={() => handleOptionsClickTimeInterval(2)}>
                  За 2 часа
                </div>
                <div
                  className={selectedTimeInterval !== 3 ? style.option : style.optionHide}
                  onClick={() => handleOptionsClickTimeInterval(3)}>
                  За день
                </div>
                <div
                  className={selectedTimeInterval !== 4 ? style.option : style.optionHide}
                  onClick={() => handleOptionsClickTimeInterval(4)}>
                  За неделю
                </div>
                <div
                  className={selectedTimeInterval !== 5 ? style.option : style.optionHide}
                  onClick={() => handleOptionsClickTimeInterval(5)}>
                  Никогда
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={style.buttonBlock}>
        <button type='submit' className={style.submit}>
          Сохранить
        </button>
      </div>
    </form>
  );
};