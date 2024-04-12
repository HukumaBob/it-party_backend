import React from "react";
import style from "./styles/App.module.scss";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./Layout";
import { MainPage } from "../pages/MainPage";
import { EventPage } from "../pages/EventPage";
import { useDispatch, useSelector } from "./types/hooks";
import { setOpenModal } from "./services/slices/authorization";
import { Modal } from "../shared/modal";
import { AuthorizationModal } from "../widgets/Authorization";

function App() {
  const { openModal } = useSelector((state) => state.authorization);
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(setOpenModal(false));
  };
  return (
    <div className={style.wrapper}>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<MainPage />} />
          <Route path='/event/:id' element={<EventPage />} />
          {/* <Route path='/account' element={<AccountPage />} /> */}
          {/* <Route path='/myEvent' element={<MyEventPage />} /> */}
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
