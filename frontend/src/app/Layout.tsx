import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "./services/hooks.ts";
import {getUserProfile} from "./services/slices/profileSlice.ts";
import {HeaderAdmin} from "../entities/HeaderAdmin";
import {Header} from "../entities/Header";
import {Outlet} from "react-router-dom";
import {Footer} from "../entities/Footer";
import {ModalAuthorization} from "../widgets/ModalAuthorization";
import {ModalEventRegistrationSuccess} from "../widgets/ModalEventRegistrationSuccess";
import {ModalRejectApplicant} from "../widgets/ModalRejectApplicant";
import {ModalResetPassword} from "../widgets/ModalResetPassword";
import {ModalAuthorizationSuccess} from "../widgets/ModalAuthorizationSuccess";

export const Layout: React.FC<{ type?: 'admin' }> = ({type}) => {
  const dispatch = useAppDispatch();
  const {isAuthorized} = useAppSelector(state => state.authorization);
  const {statusGetProfile} = useAppSelector(state => state.profile);
  useEffect(() => {
    isAuthorized && statusGetProfile === 'idle' && dispatch(getUserProfile());
  }, [isAuthorized, statusGetProfile]);

  return (
    <div className='appContainer'>
      {type === 'admin' ? <HeaderAdmin/> : <Header/>}
      <main>
        <Outlet/>
      </main>
      <Footer/>
      <ModalAuthorization/>
      <ModalEventRegistrationSuccess/>
      <ModalRejectApplicant/>
      <ModalResetPassword/>
      <ModalAuthorizationSuccess/>
    </div>
  );
};
