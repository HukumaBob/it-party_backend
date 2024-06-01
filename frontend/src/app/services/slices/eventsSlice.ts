import { createSlice } from "@reduxjs/toolkit";
import { getEventsList } from "../../api/api";
import { TEventsInitialState } from "../../types/types";

const initialState: TEventsInitialState = {
  cards: [],
  cities: [],
  specializations: [],
  loading: false,
  error: null,
  filters: { online: true },
  specializationsFilters: { 0: true }
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    searchName(state, action) {
      state.filters.name = action.payload
    },
    searchCity(state, action) {
      switch (action.payload) {
        case 0: delete state.filters.city; break;
        default: state.filters.city = action.payload
      }
    },
    searchSpecialization(state, action) {
      const { id, add, clear } = action.payload

      if (clear) state.specializationsFilters = { 0: true }
      else {
        if (state.specializationsFilters["0"]) delete state.specializationsFilters["0"]

        if (add) state.specializationsFilters[id] = id
        else delete state.specializationsFilters[id]
      }
    },
    searchOnline(state, action) {
      switch (action.payload) {
        case "online": state.filters.online = true; break;
        case "offline": state.filters.online = false; break;
        default: delete state.filters?.online;
      }
    },
    searchDate(state, action) {
      state.filters.date_after = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEventsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEventsList.fulfilled, (state, action) => {
        // @ts-ignore
        const { cards, cities, specializations } = action.payload
        // @ts-ignore
        state.cards = cards;
        if (cities) state.cities = cities;
        if (specializations) state.specializations = specializations;
        state.error = null;
        state.loading = false;
      })
      .addCase(getEventsList.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { searchCity, searchSpecialization, searchName, searchOnline, searchDate } = eventsSlice.actions;
export default eventsSlice.reducer;