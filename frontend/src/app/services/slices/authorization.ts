import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  TAuthorizationInitialState,
  TFormAuthorization,
  TLoginResponse,
  TResponseReg,
} from "../../types/types";
import { registerUsers } from "../actions/authorization";

export const initialState: TAuthorizationInitialState = {
  openModal: false,
  showPassword: false,
  openRegistration: false,
  checked: false,
  error: null,
  ok: false,
  data: { email: "", password: "" },
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
    setOpenRegistration: (state, action: PayloadAction<boolean>) => {
      state.openRegistration = action.payload;
    },
    setCheked: (state, action: PayloadAction<boolean>) => {
      state.checked = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setOk: (state, action: PayloadAction<boolean>) => {
      state.ok = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUsers.pending, (state) => {
        state.error = null;
      })
      .addCase(registerUsers.fulfilled, (state, action: any) => {
        state.ok = true;
        state.data = action.payload;
      })
      .addCase(registerUsers.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const {
  setOpenModal,
  setShowPassword,
  setOpenRegistration,
  setCheked,
  setError,
  setOk,
} = authorizationSlice.actions;

export default authorizationSlice.reducer;
