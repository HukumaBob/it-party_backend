import {combineReducers} from "redux";
import adminApplicantsSlice from "./slices/adminApplicantsSlice";
import adminEditEventSlice from "./slices/adminEditEventSlice.ts";
import adminEventListSlice from "./slices/adminEventListSlice";
import applyRegistrationSlice from "./slices/applyRegistrationSlice";
import authorizationSlice from "./slices/authorizationSlice.ts";
import citySlice from "./slices/citySlice";
import countrySlice from "./slices/countrySlice";
import educationSlice from "./slices/educationSlice";
import eventListSlice from "./slices/eventListSlice";
import eventSlice from "./slices/eventSlice";
import experienceSlice from "./slices/experienceSlice";
import favoriteSlice from "./slices/favoriteSlice";
import incomeSlice from "./slices/incomeSlice";
import maritalStatusSlice from "./slices/familyStatusSlice.ts";
import notificationSlice from "./slices/notificationSlice";
import profileEventListSlice from "./slices/profileEventListSlice.ts";
import profileResetPasswordSlice from "./slices/profileResetPasswordSlice.ts";
import profileSlice from "./slices/profileSlice.ts";
import questionAnswerSlice from "./slices/questionAnswerSlice";
import reviewSlice from "./slices/reviewSlice";
import sliderSlice from "./slices/sliderSlice";
import specializationsSlice from "./slices/specializationsSlice";
import stackListSlice from "./slices/stackListSlice";

export const rootReducer = combineReducers({
  adminApplicants: adminApplicantsSlice,
  adminEditEvent: adminEditEventSlice,
  adminEvents: adminEventListSlice,
  applyRegistration: applyRegistrationSlice,
  authorization: authorizationSlice,
  city: citySlice,
  country: countrySlice,
  education: educationSlice,
  event: eventSlice,
  eventList: eventListSlice,
  experience: experienceSlice,
  familyStatus: maritalStatusSlice,
  favorite: favoriteSlice,
  income: incomeSlice,
  notification: notificationSlice,
  profile: profileSlice,
  profileEventList: profileEventListSlice,
  profileResetPassword: profileResetPasswordSlice,
  questionAnswer: questionAnswerSlice,
  review: reviewSlice,
  slider: sliderSlice,
  specializations: specializationsSlice,
  stackList: stackListSlice,
});
