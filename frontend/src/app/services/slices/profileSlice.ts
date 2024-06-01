import { PayloadAction, createSlice, createAction } from "@reduxjs/toolkit";
import { TProfileInitialState } from "../../types/types";
import { receiveProfile, createProfile } from "../actions/profile";
const profileStorage = localStorage.getItem("updateInfo");
const profileInfo = profileStorage ? JSON.parse(profileStorage) : {};
const avatarStorage = "http://localhost:8000";
export const resetState = createAction('resetState');

export const initialState: TProfileInitialState = {
  name: (profileStorage && profileInfo.first_name !== null) ? profileInfo.first_name : "",
  secondName: (profileStorage && profileInfo.last_name !== null) ? profileInfo.last_name : "",
  errorProfile: null,
  receiveProfileUser: false,
  avatar: (profileStorage && profileInfo.user_photo !== "") ? `${avatarStorage}${profileInfo.user_photo}` : "",
  place_of_work: (profileStorage && profileInfo.place_of_work !== "") ? profileInfo.place_of_work : "",
  position: (profileStorage && profileInfo.position !== "") ? profileInfo.position : "",
  hobby: (profileStorage && profileInfo.hobby !== "") ? profileInfo.hobby : "",
  values: (profileStorage && profileInfo.values !== "") ? profileInfo.values: "",
  aims: (profileStorage && profileInfo.aims !== "") ? profileInfo.aims : "",
  cv: (profileStorage && profileInfo.cv !== "") ? profileInfo.cv : "",
  phone: (profileStorage && profileInfo.phone !== "") ? profileInfo.phone : "",
  email: (profileStorage && profileInfo.email !== "") ? profileInfo.email : "",
  motivation: (profileStorage && profileInfo.motivation !== "") ? profileInfo.motivation : "",
  notification: (profileStorage && profileInfo.notification !== null) ? profileInfo.notification : 0,
  selectedMaritalStatus: (profileStorage && profileInfo.familystatus !== null) ? profileInfo.familystatus : 0,
  selectedCountry: (profileStorage && profileInfo.country !== null) ? profileInfo.country : 1,
  selectedProfileExperience: (profileStorage && profileInfo.experience !== null) ? profileInfo.experience : 0,
  selectedProfileSpecialization: (profileStorage && profileInfo.specialization !== null) ? profileInfo.specialization : 0,
  selectedIncome: (profileStorage && profileInfo.income !== null) ? profileInfo.income : 0,
  selectedEducation: (profileStorage && profileInfo.education !== null) ? profileInfo.education : 0,
  selectedTimeInterval: 0,
  selectedNavDataPersonal: true,
  selectedNavCareerAndEducation: false,
  selectedNavAboutMe: false,
  selectedNavConfidentiality: false,
  selectedNavNotification: false,
  selectedNavMain: false,
  openModalAvatar: false,
  changeDateOfBirth: (profileStorage && profileInfo.date_of_birth !== null && profileInfo.date_of_birth !== "") ? profileInfo.date_of_birth : null,
  clickMaritalStatus: false,
  clickCountry: false,
  clickProfileExperience: false,
  clickProfileSpecialization: false,
  clickIncome: false,
  clickEducation: false,
  onlineCheckedFormAboutMe: (profileStorage && profileInfo.online !== null) ? profileInfo.online : false,
  offlineCheckedFormAboutMe: (profileStorage && profileInfo.offline !== null) ? profileInfo.offline : false,
  clickTimeInterval: false,
  smsChecked: false,
  emailChecked: false,
  approvalApplicationChecked: false,
  newEventsChecked: false,
  profileBlock: true,
  showPassword: false,
  showPasswordConfirm: false,
};
export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setSecondName: (state, action: PayloadAction<string>) => {
      state.secondName = action.payload;
    },
    setErrorProfile: (state, action: PayloadAction<string | null>) => {
      state.errorProfile = action.payload;
    },
    setProfile: (state, action: PayloadAction<boolean>) => {
      state.receiveProfileUser = action.payload;
    },
    setAvatar: (state, action: PayloadAction<string>) => {
      state.avatar = action.payload;
    },
    setPlaceOfWork: (state, action: PayloadAction<string>) => {
      state.place_of_work = action.payload;
    },
    setPosition: (state, action: PayloadAction<string>) => {
      state.position = action.payload;
    },
    setHobby: (state, action: PayloadAction<string>) => {
      state.hobby = action.payload;
    }, 
    setValues: (state, action: PayloadAction<string>) => {
      state.values = action.payload;
    },
    setAims: (state, action: PayloadAction<string>) => {
      state.aims = action.payload;
    },
    setCv: (state, action: PayloadAction<string>) => {
      state.cv = action.payload;
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setMotivation:(state, action: PayloadAction<string>) => {
      state.motivation = action.payload;
    },
    setNotification:(state, action: PayloadAction<number>) => {
      state.notification = action.payload;
    },
    setUser: (state, action: PayloadAction<boolean>) => {
      state.receiveProfileUser = action.payload;
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
    setSelectedTimeInterval: (state, action: PayloadAction<number>) => {
      state.selectedTimeInterval = action.payload;
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
    setChangeDateOfBirth: (state, action: PayloadAction<string>) => {
      state.changeDateOfBirth = action.payload;
    },
    setSelectedCountry: (state, action: PayloadAction<number>) => {
      state.selectedCountry = action.payload;
    },
    setClickMaritalStatus: (state, action: PayloadAction<boolean>) => {
      state.clickMaritalStatus = action.payload;
    },
    setClickCountry: (state, action: PayloadAction<boolean>) => {
      state.clickCountry = action.payload;
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
    setOfflineCheckedFormAboutMe: (state, action: PayloadAction<boolean>) => {
      state.offlineCheckedFormAboutMe = action.payload;
    },
    setOnlineCheckedFormAboutMe: (state, action: PayloadAction<boolean>) => {
      state.onlineCheckedFormAboutMe = action.payload;
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
    setProfileBlock: (state, action: PayloadAction<boolean>) => {
      state.profileBlock = action.payload;
    },
    setShowPassword: (state, action: PayloadAction<boolean>) => {
      state.showPassword = action.payload;
    },
    setShowPasswordConfirm: (state, action: PayloadAction<boolean>) => {
      state.showPasswordConfirm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetState, () => initialState)
      .addCase(receiveProfile.pending, (state) => {
        state.errorProfile = null;
      })
      .addCase(receiveProfile.fulfilled, (state) => {
        state.errorProfile = null;
        state.receiveProfileUser = true;
      })
      .addCase(receiveProfile.rejected, (state, action) => {
        state.errorProfile = action.error.message;
        state.receiveProfileUser = false;
      })
      .addCase(createProfile.pending, (state) => {
        state.errorProfile = null;
      })
      .addCase(createProfile.fulfilled, (state) => {
        state.errorProfile = null;
        state.receiveProfileUser = true;
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.errorProfile = action.error.message;
        state.receiveProfileUser = false;
      })
  },
});

export const {
  setName,
  setSecondName,
  setErrorProfile,
  setProfile,
  setAvatar,
  setPlaceOfWork,
  setPosition,
  setHobby,
  setValues,
  setAims,
  setCv,
  setPhone,
  setEmail,
  setMotivation,
  setNotification,
  setUser,
  setSelectedMaritalStatus,
  setSelectedProfileExperience,
  setSelectedProfileSpecialization,
  setSelectedIncome,
  setSelectedEducation,
  setSelectedTimeInterval,
  setSelectedNavDataPersonal,
  setSelectedNavCareerAndEducation,
  setSelectedNavAboutMe,
  setSelectedNavConfidentiality,
  setSelectedNavNotification,
  setSelectedNavMain,
  setOpenModalAvatar,
  setChangeDateOfBirth,
  setSelectedCountry,
  setClickMaritalStatus,
  setClickCountry,
  setClickProfileExperience,
  setClickProfileSpecialization,
  setClickIncome,
  setClickEducation,
  setOfflineCheckedFormAboutMe,
  setOnlineCheckedFormAboutMe,
  setEmailChecked,
  setSmsChecked,
  setApprovalApplicationChecked,
  setNewEventsChecked,
  setClickTimeInterval,
  setProfileBlock,
  setShowPassword,
  setShowPasswordConfirm,
} = profileSlice.actions;

export default profileSlice.reducer;
