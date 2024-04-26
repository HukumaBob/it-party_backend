import React, { useState } from "react";
import style from "./index.module.scss";
import { FormEditAvatar } from "../../widgets/FormEditAvatar";
import { useDispatch, useSelector } from "../../app/types/hooks";
import avatarProfileForm from "../../app/assets/icons/avatarProfileForm.svg";
import {
  setOpenModalAvatar,
} from "../../app/services/slices/formSlice";

export const ProfileBlock = () => {
  const profile = localStorage.getItem("updateInfo");
  const profileData = profile ? JSON.parse(profile) : {};
  const titleFirst: string = profile !== undefined ? profileData.first_name : "";
  const titleLast: string = profile !== undefined ? profileData.last_name : "";
  const avatarProfile: string = avatarProfileForm;
  const dispatch = useDispatch();
  const {
    openModalAvatar,
  } = useSelector((state) => state.form);
  const handleEditAvatar = () => {
    dispatch(setOpenModalAvatar(true));
  }

  return (
    <section className={style.section}>
      <div className={openModalAvatar === true ? style.container : style.popupBlock}>
        <FormEditAvatar />
      </div>
      <div className={style.formBlockProfile}>
        <button type="button" onClick={handleEditAvatar} className={style.formBlockProfile_button}>Изменить фото</button>
        <img className={style.formBlockProfile_avatar} src={avatarProfile} alt="Фотография пользователя" />    
      </div>
      {(profile !== undefined && profileData.first_name !== undefined && profileData.last_name !== "") ?
        (<div className={style.formBlockName}>
          <h2 className={style.formBlock_title}>{titleFirst}</h2>
          <h2 className={style.formBlock_title}>{titleLast}</h2>
         </div>) :
        (
          <div className={style.formBlockTitle}>
            <h2 className={style.formBlock_title}>Давайте познакомимся</h2>
          </div>
        )
      }
    </section>
  )
}
