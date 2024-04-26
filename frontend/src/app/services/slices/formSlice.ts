import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TInitialStateForm } from "../../types/types";

export const initialState: TInitialStateForm = {
  clickExperience: false,
  clickDirection: false,
  clickMaritalStatus: false,
  clickProfileExperience: false,
  clickProfileSpecialization: false,
  clickIncome: false,
  clickEducation: false,
  clickTimeInterval: false,
  onlineChecked: false,
  offlineChecked: false,
  onlineCheckedFormAboutMe: false,
  offlineCheckedFormAboutMe: false,
  agreementChecked: false,
  agreementPersonInfoChecked: false,
  smsChecked: false,
  emailChecked: false,
  approvalApplicationChecked: false,
  newEventsChecked: false,
  selectedDirection: "",
  selectedExperience: "",
  selectedMaritalStatus: 0, 
  selectedProfileExperience: 0,
  selectedProfileSpecialization: 0,
  selectedIncome: 0,
  selectedEducation: 0,
  selectedTimeInterval: 0,
  selectedNavDataPersonal: true,
  selectedNavCareerAndEducation: false,
  selectedNavAboutMe: false,
  selectedNavConfidentiality: false,
  selectedNavNotification: false,
  selectedNavMain: false,
  openModalAvatar: false,
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
    setClickMaritalStatus: (state, action: PayloadAction<boolean>) => {
      state.clickMaritalStatus = action.payload;
    },
    setClickProfileExperience: (state, action: PayloadAction<boolean>) => {
      state.clickProfileExperience = action.payload;
    },
    setClickProfileSpecialization: (state, action: PayloadAction<boolean>) => {
      state.clickProfileSpecialization = action.payload;
    },
    setClickIncome: (state, action: PayloadAction<boolean>) => {
      state.clickIncome = action.payload;
    },
    setClickEducation: (state, action: PayloadAction<boolean>) => {
      state.clickEducation = action.payload;
    },
    setOnlineChecked: (state, action: PayloadAction<boolean>) => {
      state.onlineChecked = action.payload;
    },
    setOfflineChecked: (state, action: PayloadAction<boolean>) => {
      state.offlineChecked = action.payload;
    },
    setOfflineCheckedFormAboutMe: (state, action: PayloadAction<boolean>) => {
      state.offlineCheckedFormAboutMe = action.payload;
    },
    setOnlineCheckedFormAboutMe: (state, action: PayloadAction<boolean>) => {
      state.onlineCheckedFormAboutMe = action.payload;
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
    setSelectedMaritalStatus: (state, action: PayloadAction<number>) => {
      state.selectedMaritalStatus = action.payload;
    },
    setSelectedProfileExperience: (state, action: PayloadAction<number>) => {
      state.selectedProfileExperience = action.payload;
    },
    setSelectedProfileSpecialization: (state, action: PayloadAction<number>) => {
      state.selectedProfileSpecialization = action.payload;
    },
    setSelectedIncome: (state, action: PayloadAction<number>) => {
      state.selectedIncome = action.payload;
    },
    setSelectedEducation: (state, action: PayloadAction<number>) => {
      state.selectedEducation = action.payload;
    },
    setEmailChecked: (state, action: PayloadAction<boolean>) => {
      state.emailChecked = action.payload;
    },
    setSmsChecked: (state, action: PayloadAction<boolean>) => {
      state.smsChecked = action.payload;
    },
    setApprovalApplicationChecked: (state, action: PayloadAction<boolean>) => {
      state.approvalApplicationChecked = action.payload;
    },
    setNewEventsChecked: (state, action: PayloadAction<boolean>) => {
      state.newEventsChecked = action.payload;
    },
    setSelectedTimeInterval: (state, action: PayloadAction<number>) => {
      state.selectedTimeInterval = action.payload;
    },
    setClickTimeInterval: (state, action: PayloadAction<boolean>) => {
      state.clickTimeInterval = action.payload;
    },
    setSelectedNavDataPersonal: (state, action: PayloadAction<boolean>) => {
      state.selectedNavDataPersonal = action.payload;
    },
    setSelectedNavCareerAndEducation: (state, action: PayloadAction<boolean>) => {
      state.selectedNavCareerAndEducation = action.payload;
    },
    setSelectedNavAboutMe: (state, action: PayloadAction<boolean>) => {
      state.selectedNavAboutMe = action.payload;
    },
    setSelectedNavConfidentiality: (state, action: PayloadAction<boolean>) => {
      state.selectedNavConfidentiality = action.payload;
    },
    setSelectedNavNotification: (state, action: PayloadAction<boolean>) => {
      state.selectedNavNotification = action.payload;
    },
    setSelectedNavMain: (state, action: PayloadAction<boolean>) => {
      state.selectedNavMain = action.payload;
    },
    setOpenModalAvatar: (state, action: PayloadAction<boolean>) => {
      state.openModalAvatar = action.payload;
    },
  },
});

export const {
  setClickExperience,
  setClickDirection,
  setClickMaritalStatus,
  setClickProfileExperience,
  setClickProfileSpecialization,
  setClickIncome,
  setClickEducation,
  setOnlineChecked,
  setOfflineChecked,
  setOfflineCheckedFormAboutMe,
  setOnlineCheckedFormAboutMe,
  setAgreementChecked,
  setAgreementPersonInfoChecked,
  setSelectedDirection,
  setSelectedExperience, 
  setSelectedMaritalStatus,
  setSelectedProfileExperience,
  setSelectedProfileSpecialization,
  setSelectedIncome,
  setSelectedEducation,
  setEmailChecked,
  setSmsChecked,
  setApprovalApplicationChecked,
  setNewEventsChecked,
  setSelectedTimeInterval,
  setClickTimeInterval,
  setSelectedNavDataPersonal,
  setSelectedNavCareerAndEducation,
  setSelectedNavAboutMe,
  setSelectedNavConfidentiality,
  setSelectedNavNotification,
  setSelectedNavMain,
  setOpenModalAvatar,
} = formSlice.actions;

export default formSlice.reducer;
