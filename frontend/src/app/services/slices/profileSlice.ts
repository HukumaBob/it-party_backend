import {PayloadAction, createSlice, createAction} from "@reduxjs/toolkit";
import {TProfileInitialState} from "../../types/types";

const profileStorage = localStorage.getItem("updateInfo");
const profileInfo = profileStorage ? JSON.parse(profileStorage) : {};
export const resetState = createAction('resetState');

const initialState: TProfileInitialState = {
  selectedTimeInterval: (profileStorage && profileInfo.notification !== null) ? profileInfo.notification : 0,
  clickTimeInterval: false,
  smsChecked: false,
  emailChecked: false,
  approvalApplicationChecked: false,
  newEventsChecked: false,
};
export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setSelectedTimeInterval: (state, action: PayloadAction<number>) => {
      state.selectedTimeInterval = action.payload;
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
    setClickTimeInterval: (state, action: PayloadAction<boolean>) => {
      state.clickTimeInterval = action.payload;
    },
    resetProfile: (state) => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('updateInfo');
      localStorage.removeItem("countries");
      Object.assign(state, {});
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetState, () => initialState)
  },
});

export const {
  setSelectedTimeInterval,
  setEmailChecked,
  setSmsChecked,
  setApprovalApplicationChecked,
  setNewEventsChecked,
  setClickTimeInterval,
  resetProfile
} = profileSlice.actions;

export default profileSlice.reducer;
