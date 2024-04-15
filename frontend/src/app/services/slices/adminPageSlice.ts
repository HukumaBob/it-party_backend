import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TAdminPageInitialState, TApplication, TCard } from "../../types/types";

// Функция для сохранения данных в локальное хранилище
const saveDataToLocalStorage = <T>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Функция для загрузки данных из локального хранилища
const loadDataFromLocalStorage = <T>(key: string): T => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : null; // Изменено на null, чтобы возвращать пустой объект по умолчанию
};

export const initialState: TAdminPageInitialState = {
  activeTab: "Все",
  archive: loadDataFromLocalStorage("archive") || [], // Исправлено: Добавлено значение по умолчанию
  refusals: loadDataFromLocalStorage("refusals") || [], // Исправлено: Добавлено значение по умолчанию
  showInput: null,
  inputValues: loadDataFromLocalStorage("inputValues") || {}, // Исправлено: Добавлено значение по умолчанию
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    addToArchive: (state, action: PayloadAction<TCard>) => {
      state.archive.push(action.payload);
      saveDataToLocalStorage("archive", state.archive);
    },
    addToRefusals: (state, action: PayloadAction<TApplication>) => {
      state.refusals.push(action.payload);
      saveDataToLocalStorage("refusals", state.refusals);
    },
    deleteRefusal: (state, action: PayloadAction<number>) => {
      state.refusals = state.refusals.filter((el) => el.id !== action.payload);
      saveDataToLocalStorage("refusals", state.refusals);
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      state.archive = state.archive.filter((el) => el.id !== action.payload);
      saveDataToLocalStorage("archive", state.archive);
    },
    setShowInput: (state, action: PayloadAction<number | null>) => {
      state.showInput = action.payload;
    },
    setInputValue: (
      state,
      action: PayloadAction<{ userId: number; inputValue: string }>,
    ) => {
      const { userId, inputValue } = action.payload;
      state.inputValues[userId] = inputValue;
      saveDataToLocalStorage("inputValues", state.inputValues);
    },
  },
});

export const {
  setActiveTab,
  addToArchive,
  deleteItem,
  addToRefusals,
  deleteRefusal,
  setShowInput,
  setInputValue,
} = adminSlice.actions;

export default adminSlice.reducer;
