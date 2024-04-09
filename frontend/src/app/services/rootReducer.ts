import { combineReducers } from "redux";
import bannerSlice from "./slices/bannerSlice";
import formSlice from "./slices/formSlice";
import authorizationSlice from "./slices/authorization";

export const rootReducer = combineReducers({
  banner: bannerSlice,
  form: formSlice,
  authorization: authorizationSlice,
});
