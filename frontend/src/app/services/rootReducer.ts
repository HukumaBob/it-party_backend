import { combineReducers } from "redux";
import bannerSlice from "./slices/bannerSlice";
import formSlice from "./slices/formSlice";
import authorizationSlice from "./slices/authorization";
import eventsSlice from "./slices/eventsSlice";
import adminSlice from "./slices/adminPageSlice";
import profileSlice from "./slices/profileSlice";
import myEventsSlice from "./slices/myEventsSlice";

export const rootReducer = combineReducers({
  banner: bannerSlice,
  form: formSlice,
  authorization: authorizationSlice,
  events: eventsSlice,
  admin: adminSlice,
  profile: profileSlice,
  myEvents: myEventsSlice
});
