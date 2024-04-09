import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TAuthorizationInitialState } from "../../types/types";

export const initialState: TAuthorizationInitialState = {
  openModal: false,
  showPassword: false,
};
export const authorizationSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    setOpenModal: (state, action: PayloadAction<boolean>) => {
      state.openModal = action.payload;
    },
    setShowPassword: (state, action: PayloadAction<boolean>) => {
      state.showPassword = action.payload;
    },
  },
});

export const { setOpenModal, setShowPassword } = authorizationSlice.actions;

export default authorizationSlice.reducer;
