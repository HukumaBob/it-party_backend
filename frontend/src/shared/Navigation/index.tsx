import React, { useState } from "react";
import style from "./index.module.scss";
import { NavLink } from 'react-router-dom';
import { TNavigation} from "../../app/types/types";
import { useDispatch, useSelector } from "../../app/types/hooks";
import {
  setSelectedNavDataPersonal,
  setSelectedNavCareerAndEducation,
  setSelectedNavAboutMe,
  setSelectedNavConfidentiality,
  setSelectedNavNotification,
  setSelectedNavMain,
} from "../../app/services/slices/formSlice";

export const Navigation = ({ id }: TNavigation) => {
  const dispatch = useDispatch();
  const {
    selectedNavDataPersonal,
    selectedNavCareerAndEducation,
    selectedNavAboutMe,
    selectedNavConfidentiality,
    selectedNavNotification,
    selectedNavMain,
  } = useSelector((state) => state.form);

  const handleNavigationDataPersonal = () => {
    handleInActiveNav();
    dispatch(setSelectedNavDataPersonal(true));
  }
  const handleCareerAndEducation = () => {
    handleInActiveNav();
    dispatch(setSelectedNavCareerAndEducation(true));
  }
  const handleAboutMe = () => {
    handleInActiveNav();
    dispatch(setSelectedNavAboutMe(true));
  }
  const handleConfidentiality = () => {
    handleInActiveNav();
    dispatch(setSelectedNavConfidentiality(true));
  }
  const handleNotification = () => {
    handleInActiveNav();
    dispatch(setSelectedNavNotification(true));
  }
  const handleInActiveNav = () => {
    dispatch(setSelectedNavDataPersonal(false));
    dispatch(setSelectedNavNotification(false));
    dispatch(setSelectedNavConfidentiality(false));
    dispatch(setSelectedNavAboutMe(false));
    dispatch(setSelectedNavCareerAndEducation(false));
    dispatch(setSelectedNavMain(false));
  }
  const handleMain = () => {
    dispatch(setSelectedNavMain(!selectedNavMain));
    handleInActiveNav();
    dispatch(setSelectedNavDataPersonal(true));
  }

  return (
    <section className={style.section}>
      <nav className={style.navigateContainer}>
        <NavLink to="/account/#formDataPersonal" className={selectedNavDataPersonal ? style.navigateContainer_linkActive : style.navigateContainer_link} onClick={handleNavigationDataPersonal}>Персональные данные</NavLink>
        <NavLink to="/account/#formCareerAndEducation" className={selectedNavCareerAndEducation? style.navigateContainer_linkActive : style.navigateContainer_link} onClick={handleCareerAndEducation}>Карьера и образование</NavLink>
        <NavLink to="/account/#formAboutMe" className={selectedNavAboutMe ? style.navigateContainer_linkActive : style.navigateContainer_link } onClick={handleAboutMe}>О себе</NavLink>
        <NavLink to="/account/#formConfidentiality" className={selectedNavConfidentiality ? style.navigateContainer_linkActive : style.navigateContainer_link} onClick={handleConfidentiality}>Конфиденциальность</NavLink>
        <NavLink to="/account/#formNotification" className={selectedNavNotification ? style.navigateContainer_linkActive : style.navigateContainer_link} onClick={handleNotification}>Уведомления</NavLink>
        <NavLink to="/" className={selectedNavMain ? style.navigateContainer_linkActive : style.navigateContainer_link } onClick={handleMain}>Выход</NavLink>
      </nav>
    </section>
  )
}
export default Navigation;