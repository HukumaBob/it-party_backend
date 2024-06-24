import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserProfile, postUserProfile } from "../../api/api";

export const receiveProfile = createAsyncThunk(
  "user/receive",
  async () => {
    try {
      const res = await getUserProfile();
      localStorage.setItem("updateInfo", JSON.stringify(res));
      return res;
    } catch (error) {
      console.log(error);
    };
  },
);

export const createProfile = createAsyncThunk(
  "user/create",
  async () => {
    try {
      const res = await postUserProfile();
      localStorage.setItem("updateInfo", JSON.stringify(res));
      return res;
    } catch (error) {
      console.log(error);
    };
  },
);