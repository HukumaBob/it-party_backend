import React, { useState } from "react";
import style from "./index.module.scss";
import { FormEditAvatar } from "../../widgets/FormEditAvatar";
import { useDispatch, useSelector } from "../../app/types/hooks";
import avatarProfileForm from "../../app/assets/icons/avatarProfileForm.svg";
import {
  setOpenModalAvatar,
} from "../../app/services/slices/profileSlice";

export const ProfileBlock = () => {
  const {
    name,
    secondName,
    avatar
  } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const {
    openModalAvatar,
  } = useSelector((state) => state.profile);

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
        <img className={style.formBlockProfile_avatar} src={(avatar !== "") ? avatar : avatarProfileForm} alt="Фотография пользователя" />    
      </div>
      {(name !== "" && secondName !== "") ?
        (<div className={style.formBlockTitle}>
          <h2 className={style.formBlockTitle_title}>{name !== "" ? name : ""}</h2>
          <h2 className={style.formBlockTitle_subtitle}>{secondName !== "" ? secondName : ""}</h2>
         </div>) :
        (
          <div className={style.formBlockTitle}>
            <h2 className={style.formBlockTitle_title}>Давайте познакомимся</h2>
          </div>
        )
      }
    </section>
  )
}
