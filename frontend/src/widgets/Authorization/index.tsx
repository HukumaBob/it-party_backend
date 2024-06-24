import React from "react";
import style from "./index.module.scss";
import logo from "../../app/assets/icons/big_Logo.svg";
import { AuthorizationForm } from "../../features/AuthorizationForm";
export const AuthorizationModal = () => {
  return (
    <div className={style.container}>
      <img src={logo} alt='' />
      <AuthorizationForm />
    </div>
  );
};
