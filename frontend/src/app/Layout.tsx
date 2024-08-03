import React from "react";
import {HeaderAdmin} from "../entities/HeaderAdmin";
import {Header} from "../entities/Header";
import {Outlet} from "react-router-dom";
import {Footer} from "../entities/Footer";
import {ModalAuthorization} from "../widgets/ModalAuthorization";
import {ModalSuccess} from "../widgets/ModalSuccess";
import {ModalRejectApplicant} from "../widgets/modalRejectApplicant";
import {ModalResetPassword} from "../widgets/ModalResetPassword";

export const Layout: React.FC<{ type?: 'admin' }> = ({type}) => (
  <div className='appContainer'>
    {type === 'admin' ? <HeaderAdmin/> : <Header/>}
    <main>
      <Outlet/>
    </main>
    <Footer/>
    <ModalAuthorization/>
    <ModalSuccess/>
    <ModalRejectApplicant/>
    <ModalResetPassword/>
  </div>
);
