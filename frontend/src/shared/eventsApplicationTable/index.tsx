import React from "react";
import style from "./index.module.scss";
import iconTrue from "../../app/assets/icons/iconTableTrue.svg";
import iconFalse from "../../app/assets/icons/iconTableFalse.svg";
import { tableMocks } from "../../app/mocks/table";
import { useDispatch, useSelector } from "../../app/types/hooks";
import {
  addToRefusals,
  setInputValue,
  setShowInput,
  setStatus,
} from "../../app/services/slices/adminPageSlice";
import { TApplication } from "../../app/types/types";
import { Modal } from "../modal";
export const EventsTable = () => {
  const { refusals, showInput, inputValues, status } = useSelector(
    (store) => store.admin,
  );

  const handleSave = (el: any) => {
    dispatch(setShowInput(null));
    handleAddToRefusals(el);
  };

  const handleAddToRefusals = (el: TApplication) => {
    const existingItem = refusals.find((item) => item.id === el.id);
    if (!existingItem) {
      dispatch(addToRefusals(el));
    }
  };
  const handleInputChange = (userId: number, inputValue: string) => {
    dispatch(setInputValue({ userId, inputValue }));
  };
  const handleStatus = (userId: number, value: string) => {
    dispatch(setStatus({ userId, value }));
  };
  const dispatch = useDispatch();
  return (
    <table className={style.table}>
      <thead>
        <tr>
          <th className={style.people}>Участник</th>
          <th className={style.company}>Компания</th>
          <th className={style.post}>Должность</th>
          <th className={style.experience}>Опыт</th>
          <th className={style.status}>Статус</th>
          <th className={style.application}>Заявка</th>
        </tr>
      </thead>
      <tbody>
        {tableMocks.map((el, index) => (
          <>
            <tr key={index}>
              <td className={style.body_people}>{el.name}</td>
              <td className={style.body_company}>{el.company}</td>
              <td className={style.body_post}>{el.post}r</td>
              <td className={style.body_experience}>{el.experience}</td>
              <td
                className={`${
                  status[el.id] === "Одобрено"
                    ? style.statusTrue
                    : status[el.id] === "Отклонено"
                    ? style.statusFalse
                    : style.body_status
                }`}>
                {status[el.id]}
              </td>
              <td className={style.body_application}>
                <img
                  src={iconFalse}
                  alt='falseIcon'
                  className={style.false}
                  onClick={() => {
                    dispatch(setShowInput(el.id));
                    handleStatus(el.id, "Отклонено");
                  }}
                />
                <img
                  src={iconTrue}
                  alt='trueIcon'
                  className={style.true}
                  onClick={() => handleStatus(el.id, "Одобрено")}
                />
              </td>
            </tr>
            {showInput === el.id && (
              <div className={style.background}>
                <Modal close={() => dispatch(setShowInput(null))}>
                  <div className={style.inputBlock}>
                    <span>Введите причину отказа для {el.name}</span>
                    <input
                      type='text'
                      className={style.input}
                      value={inputValues[el.id] || ""}
                      onChange={(e) => {
                        handleInputChange(el.id, e.target.value);
                      }}
                    />
                    <button
                      onClick={() => {
                        handleSave(el);
                      }}>
                      Сохранить
                    </button>
                  </div>
                </Modal>
              </div>
            )}
          </>
        ))}
      </tbody>
    </table>
  );
};
