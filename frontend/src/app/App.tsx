import React from "react";
import style from "./styles/App.module.scss";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./Layout";
import { MainPage } from "../pages/MainPage";
import { EventPage } from "../pages/EventPage";
import { AccountPage } from "../pages/AccountPage";
import { useDispatch, useSelector } from "./types/hooks";
import { setOpenModal, resetState } from "./services/slices/authorization";
import { Modal } from "../shared/modal";
import { AuthorizationModal } from "../widgets/Authorization";
import { AdminPage } from "../pages/AdminPage";
import { AdminLayout } from "./AdminLayout";
import { NewApplicationPage } from "../pages/NewApplicationPage";
import { MyEventPage } from "../pages/myEventPage";
import { AlertForm } from "../shared/alerts";
import useProfileState from '../shared/useProfileState/index';

function App() {
  const { openModal } = useSelector((state) => state.authorization);
  const { alertForm } = useSelector((state) => state.form);
  const { resetForm } = useProfileState();
  const dispatch = useDispatch();
  const userLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('updateInfo');
    localStorage.removeItem("countries");
    dispatch(resetState());
    resetForm();
  };
  const handleCloseModal = () => {
    dispatch(setOpenModal(false));
  };
  return (
    <div className={style.wrapper}>
      {alertForm && <AlertForm />}

      <Routes>
        <Route element={<AdminLayout />}>
          <Route path='/admin' element={<AdminPage />} />
          <Route path='/newApplication' element={<NewApplicationPage />} />
        </Route>
        <Route element={<Layout onLogout={userLogout} />}>
          <Route path='/' element={<MainPage />} />
          <Route path='/event/:id' element={<EventPage />} />
          <Route path='/account' element={<AccountPage onLogout={userLogout} />} />
          <Route path='/myEvent' element={<MyEventPage />} />
        </Route>
      </Routes>
      {openModal && (
        <Modal close={handleCloseModal}>
          <AuthorizationModal />
        </Modal>
      )}
    </div>
  );
}

export default App;
