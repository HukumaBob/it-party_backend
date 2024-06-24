import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TInitialStateBannerSlide } from "../../types/types";

export const initialState: TInitialStateBannerSlide = {
  activeIndex: 0,
};
export const bannerSlice = createSlice({
  name: "baner",
  initialState,
  reducers: {
    setActiveIndex: (state, action: PayloadAction<number>) => {
      state.activeIndex = action.payload;
    },
  },
});

export const { setActiveIndex } = bannerSlice.actions;

export default bannerSlice.reducer;
