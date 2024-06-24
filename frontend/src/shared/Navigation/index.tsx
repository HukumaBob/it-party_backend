import React, { useState } from "react";
import style from "./index.module.scss";
import { Link } from 'react-router-dom';
import { TNavigation } from "../../app/types/types";
import { useDispatch, useSelector } from "../../app/types/hooks";
import {
  setSelectedNavDataPersonal,
  setSelectedNavCareerAndEducation,
  setSelectedNavAboutMe,
  setSelectedNavConfidentiality,
  setSelectedNavNotification,
  setSelectedNavMain,
  setProfileBlock,
} from "../../app/services/slices/profileSlice";

export const Navigation = ({ id, onLogout }: TNavigation) => {
  const dispatch = useDispatch();
  const {
    selectedNavDataPersonal,
    selectedNavCareerAndEducation,
    selectedNavAboutMe,
    selectedNavConfidentiality,
    selectedNavNotification,
    selectedNavMain,
  } = useSelector((state) => state.profile);

  const handleNavigationDataPersonal = () => {
    handleInActiveNav();
    dispatch(setProfileBlock(true));
    dispatch(setSelectedNavDataPersonal(true));
  };
  const handleCareerAndEducation = () => {
    handleInActiveNav();
    dispatch(setProfileBlock(true));
    dispatch(setSelectedNavCareerAndEducation(true));
  };
  const handleAboutMe = () => {
    handleInActiveNav();
    dispatch(setProfileBlock(true));
    dispatch(setSelectedNavAboutMe(true));
  };
  const handleConfidentiality = () => {
    handleInActiveNav();
    dispatch(setProfileBlock(false));
    dispatch(setSelectedNavConfidentiality(true));
  };
  const handleNotification = () => {
    handleInActiveNav();
    dispatch(setProfileBlock(false));
    dispatch(setSelectedNavNotification(true));
  };
  const handleInActiveNav = () => {
    dispatch(setSelectedNavDataPersonal(false));
    dispatch(setSelectedNavNotification(false));
    dispatch(setSelectedNavConfidentiality(false));
    dispatch(setSelectedNavAboutMe(false));
    dispatch(setSelectedNavCareerAndEducation(false));
    dispatch(setSelectedNavMain(false));
  };

  const handleMain = () => {
    dispatch(setSelectedNavMain(!selectedNavMain));
    onLogout();
    handleInActiveNav();
    dispatch(setProfileBlock(true));
    dispatch(setSelectedNavDataPersonal(true));
  };

  return (
    <section className={style.section}>
      <nav className={style.navigateContainer}>
        <Link to="/account/#formDataPersonal" className={selectedNavDataPersonal ? style.navigateContainer_linkActive : style.navigateContainer_link} onClick={handleNavigationDataPersonal}>Персональные данные</Link>
        <Link to="/account/#formCareerAndEducation" className={selectedNavCareerAndEducation? style.navigateContainer_linkActive : style.navigateContainer_link} onClick={handleCareerAndEducation}>Карьера и образование</Link>
        <Link to="/account/#formAboutMe" className={selectedNavAboutMe ? style.navigateContainer_linkActive : style.navigateContainer_link } onClick={handleAboutMe}>О себе</Link>
        <Link to="/account/#formConfidentiality" className={selectedNavConfidentiality ? style.navigateContainer_linkActive : style.navigateContainer_link} onClick={handleConfidentiality}>Конфиденциальность</Link>
        <Link to="/account/#formNotification" className={selectedNavNotification ? style.navigateContainer_linkActive : style.navigateContainer_link} onClick={handleNotification}>Уведомления</Link>
        <Link to="/" className={selectedNavMain ? style.navigateContainer_linkActive : style.navigateContainer_link } onClick={handleMain}>Выйти</Link>
      </nav>
    </section>
  )
}
export default Navigation;