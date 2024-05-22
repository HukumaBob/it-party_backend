import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TInitialStateForm } from "../../types/types";

export const initialState: TInitialStateForm = {
  clickExperience: false,
  clickDirection: false,
  onlineChecked: false,
  offlineChecked: false,
  agreementChecked: false,
  agreementPersonInfoChecked: false,
  selectedDirection: "",
  selectedExperience: "",
  alertForm: false,
};
export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setClickExperience: (state, action: PayloadAction<boolean>) => {
      state.clickExperience = action.payload;
    },
    setClickDirection: (state, action: PayloadAction<boolean>) => {
      state.clickDirection = action.payload;
    },
    setOnlineChecked: (state, action: PayloadAction<boolean>) => {
      state.onlineChecked = action.payload;
    },
    setOfflineChecked: (state, action: PayloadAction<boolean>) => {
      state.offlineChecked = action.payload;
    },
    setAgreementChecked: (state, action: PayloadAction<boolean>) => {
      state.agreementChecked = action.payload;
    },
    setAgreementPersonInfoChecked: (state, action: PayloadAction<boolean>) => {
      state.agreementPersonInfoChecked = action.payload;
    },
    setSelectedDirection: (state, action: PayloadAction<string>) => {
      state.selectedDirection = action.payload;
    },
    setSelectedExperience: (state, action: PayloadAction<string>) => {
      state.selectedExperience = action.payload;
    },
    setAlertForm: (state, action: PayloadAction<boolean>) => {
      state.alertForm = action.payload;
    },
  },
});

export const {
  setClickExperience,
  setClickDirection,
  setOnlineChecked,
  setOfflineChecked,
  setAgreementChecked,
  setAgreementPersonInfoChecked,
  setSelectedDirection,
  setSelectedExperience,
  setAlertForm,
} = formSlice.actions;

export default formSlice.reducer;
