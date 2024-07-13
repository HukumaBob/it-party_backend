import { PayloadAction, createSlice, createAction } from "@reduxjs/toolkit";
import { TAuthorizationInitialState } from "../../types/types";
import { loginUser, registerUsers } from "../actions/authorization";

export const resetState = createAction('resetState');

export const initialState: TAuthorizationInitialState = {
  openModal: false,
  showPassword: false,
  openRegistration: false,
  checked: false,
  error: null,
  ok: false,
  authorizationUser: false,
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
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.authorizationUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetState, () => initialState)
      .addCase(registerUsers.pending, (state) => {
        state.error = null;
      })
      .addCase(registerUsers.fulfilled, (state, action: any) => {
        state.ok = true;
        state.data = action.payload;
      })
      .addCase(registerUsers.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.error = null;
        state.authorizationUser = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.authorizationUser = false;
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
  setAuth
} = authorizationSlice.actions;

export default authorizationSlice.reducer;
