import React from "react";
import style from "./index.module.scss";
import { useDispatch, useSelector } from "../../app/types/hooks";
import { setActiveTab } from "../../app/services/slices/adminPageSlice";
export const ActiveTabBlock = () => {
  const { activeTab, archive } = useSelector((store) => store.admin);
  const dispatch = useDispatch();
  const handleSetActive = (tab: string) => {
    dispatch(setActiveTab(tab));
  };
  return (
    <ul className={style.list}>
      <li
        className={activeTab !== "Все" ? style.element : style.active}
        onClick={() => handleSetActive("Все")}>
        Все
      </li>
      <li
        className={activeTab !== "Предстоящие" ? style.element : style.active}
        onClick={() => handleSetActive("Предстоящие")}>
        Предстоящие
      </li>
      <li
        className={activeTab !== "Прошедшие" ? style.element : style.active}
        onClick={() => handleSetActive("Прошедшие")}>
        Прошедшие
      </li>
      <li
        className={activeTab !== "Архив" ? style.element : style.active}
        onClick={() => handleSetActive("Архив")}>
        Архив {archive.length}
      </li>
    </ul>
  );
};
