import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TAdminPageInitialState, TCard } from "../../types/types";

const saveArchiveToLocalStorage = (archive: TCard[]) => {
  localStorage.setItem("archive", JSON.stringify(archive));
};
const loadArchiveFromLocalStorage = (): TCard[] => {
  const archivedData = localStorage.getItem("archive");
  return archivedData ? JSON.parse(archivedData) : [];
};
export const initialState: TAdminPageInitialState = {
  activeTab: "Все",
  archive: loadArchiveFromLocalStorage(),
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
      saveArchiveToLocalStorage(state.archive);
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      state.archive = state.archive.filter((el) => el.id !== action.payload);
      saveArchiveToLocalStorage(state.archive);
    },
  },
});

export const { setActiveTab, addToArchive, deleteItem } = adminSlice.actions;

export default adminSlice.reducer;
