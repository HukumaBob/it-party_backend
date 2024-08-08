import {combineReducers} from "redux";
import applyRegistrationSlice from "./slices/applyRegistrationSlice";
import authorizationSlice from "./slices/authorizationSlice.ts";
import eventListSlice from "./slices/eventListSlice";
import adminApplicantsSlice from "./slices/adminApplicantsSlice";
import myEventsSlice from "./slices/myEventsSlice";
import specializationsSlice from "./slices/specializationsSlice";
import citySlice from "./slices/citySlice";
import reviewSlice from "./slices/reviewSlice";
import eventSlice from "./slices/eventSlice";
import favoriteSlice from "./slices/favoriteSlice";
import experienceSlice from "./slices/experienceSlice";
import stackListSlice from "./slices/stackListSlice"
import sliderSlice from "./slices/sliderSlice";
import questionAnswerSlice from "./slices/questionAnswerSlice";
import adminEventListSlice from "./slices/adminEventListSlice";
import resetPasswordSlice from "./slices/resetPasswordSlice.ts";
import profileSlice from "./slices/profileSlice.ts";
import countrySlice from "./slices/countrySlice";
import maritalStatusSlice from "./slices/familyStatusSlice.ts";
import educationSlice from "./slices/educationSlice";
import incomeSlice from "./slices/incomeSlice";
import notificationSlice from "./slices/notificationSlice";

export const rootReducer = combineReducers({
  authorization: authorizationSlice,
  eventList: eventListSlice,
  event: eventSlice,
  myEvents: myEventsSlice,
  review: reviewSlice,
  applyRegistration: applyRegistrationSlice,
  specializations: specializationsSlice,
  city: citySlice,
  favorite: favoriteSlice,
  experience: experienceSlice,
  stackList: stackListSlice,
  slider: sliderSlice,
  questionAnswer: questionAnswerSlice,
  adminEvents: adminEventListSlice,
  adminApplicants: adminApplicantsSlice,
  resetPassword: resetPasswordSlice,
  profile: profileSlice,
  country: countrySlice,
  familyStatus: maritalStatusSlice,
  education: educationSlice,
  income: incomeSlice,
  notification: notificationSlice,
});
