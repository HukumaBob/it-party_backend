import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../widgets/header";
import { Footer } from "../widgets/footer";
import style from "./styles/layout.module.scss";
import { AdminHeader } from "../widgets/AdminHeader";
export const AdminLayout = () => {
  return (
    <div className={style.container}>
      <AdminHeader />
      <main className={style.main}>
        <Outlet />
      </main>
      <div className={style.footer}>
        <Footer />
      </div>
    </div>
  );
};
