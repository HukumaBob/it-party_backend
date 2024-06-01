import React, { useState } from "react";
import style from "./index.module.scss";
import { FormDataPersonal } from "../../widgets/FormDataPersonal";
import { FormCareerAndEducation } from "../../widgets/FormCareerAndEducation"
import { FormAboutMe } from "../../widgets/FormAboutMe"
import { Navigation } from "../../shared/Navigation";
import { ProfileBlock } from "../../features/ProfileBlock";
import { FormConfidentiality } from "../../widgets/FormConfidentiality";
import { FormNotifications } from "../../widgets/FormNotifications";
import { TLogout } from "../../app/types/types";

export const AccountPage = ({ onLogout }: TLogout) => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <Navigation id="1" onLogout={onLogout}/>
        <div className={style.containerForm}>
          <ProfileBlock />
          <FormDataPersonal />
          <FormCareerAndEducation />
          <FormAboutMe />
          <FormConfidentiality />
          <FormNotifications />
        </div> 
      </div>
    </div>
  );
};
