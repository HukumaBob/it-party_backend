import React from "react";
import ReactDOM from "react-dom/client";
import {App} from "./app/App";
import {BrowserRouter} from "react-router-dom";
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from "./app/services/store";
import {Provider} from "react-redux";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import 'dayjs/locale/ru';
import dayjs from "dayjs";

dayjs.locale('ru')

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
            <App/>
          </LocalizationProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
