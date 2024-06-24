import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TAdminPageInitialState, TApplication, TCard } from "../../types/types";

const saveDataToLocalStorage = <T>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const loadDataFromLocalStorage = <T>(key: string): T => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : null;
};

export const initialState: TAdminPageInitialState = {
  activeTab: "Все",
  archive: loadDataFromLocalStorage("archive") || [],
  refusals: loadDataFromLocalStorage("refusals") || [],
  showInput: null,
  inputValues: loadDataFromLocalStorage("inputValues") || {},
  status: loadDataFromLocalStorage("status") || {},
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
    setStatus: (
      state,
      action: PayloadAction<{ userId: number; value: string }>,
    ) => {
      const { userId, value } = action.payload;
      state.status[userId] = value;
      saveDataToLocalStorage("status", state.status);
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
  setStatus,
} = adminSlice.actions;

export default adminSlice.reducer;
