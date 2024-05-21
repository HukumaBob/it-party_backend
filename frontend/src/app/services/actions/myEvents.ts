import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMyEvents, login, registerUser } from "../../api/api";
import { TFormAuthorization } from "../../types/types";

export const registerUsers = createAsyncThunk(
  "user/register",
  async ({ email, password, agreement_required }: TFormAuthorization) => {
    const res = await registerUser(email, password, agreement_required!);
    localStorage.setItem("accessToken", res.access);
    localStorage.setItem("refreshToken", res.refresh);
    return res;
  },
);

export const getMyEventsList = createAsyncThunk("myEvents", async () => {
  const response = await getMyEvents();
  return response.results;
});

