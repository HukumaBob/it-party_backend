import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TCard, TGetMyEvent, TMyEventsInitialState } from "../../types/types";
import { getMyEventsList } from "../actions/myEvents";

const saveDataToLocalStorage = <T>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const loadDataFromLocalStorage = <T>(key: string): T => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : null;
};

export const initialState: TMyEventsInitialState = {
  activeTab: "Все",
  favouriteEvents: loadDataFromLocalStorage("favouriteEvents") || [],
  active:
    loadDataFromLocalStorage<{ [key: number]: boolean }>("activeHeart") || {},
  myEvent: [],
  loading: false,
  error: null,
};
export const myEventsSlice = createSlice({
  name: "myEvents",
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    addToFavourite: (state, action: PayloadAction<TCard>) => {
      state.favouriteEvents.push(action.payload);
      saveDataToLocalStorage("favouriteEvents", state.favouriteEvents);
    },
    setActive: (
      state,
      action: PayloadAction<{ id: number; value: boolean }>,
    ) => {
      const { id, value } = action.payload;
      state.active[id] = value;
      saveDataToLocalStorage("activeHeart", state.active);
    },
    deleteFavourite: (state, action: PayloadAction<number>) => {
      state.favouriteEvents = state.favouriteEvents.filter(
        (el) => el.id !== action.payload,
      );
      saveDataToLocalStorage("favouriteEvents", state.favouriteEvents);
      saveDataToLocalStorage("activeHeart", state.active);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyEventsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyEventsList.fulfilled, (state, action) => {
        state.myEvent = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(getMyEventsList.rejected, (state, action) => {
        state.error =
          action.error.message !== undefined ? action.error.message : null;
      });
  },
});

export const { setActiveTab, addToFavourite, setActive, deleteFavourite } =
  myEventsSlice.actions;

export default myEventsSlice.reducer;
