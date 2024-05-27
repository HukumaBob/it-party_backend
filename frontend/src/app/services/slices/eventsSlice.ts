import { createSlice } from "@reduxjs/toolkit";
import { getEvents } from "../../api/api";
import { TEventsInitialState } from "../../types/types";

const initialState: TEventsInitialState = {
  cards: [],
  loading: false,
  error: null,
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.cards = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default eventsSlice.reducer;
