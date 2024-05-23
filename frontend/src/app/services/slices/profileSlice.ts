import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TProfileInitialState } from "../../types/types";
export const initialState: TProfileInitialState = {
  name: "",
  secondName: "",
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
  },
});

export const {setName,setSecondName} = profileSlice.actions;

export default profileSlice.reducer;
