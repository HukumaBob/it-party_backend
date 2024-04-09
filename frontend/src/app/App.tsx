import React from "react";
import style from "./styles/App.module.scss";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./Layout";
import { MainPage } from "../pages/MainPage";
import { EventPage } from "../pages/EventPage";

function App() {
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
    </div>
  );
}

export default App;
