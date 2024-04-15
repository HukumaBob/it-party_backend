import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, registerUser } from "../../api/api";
import { TFormAuthorization } from "../../types/types";

export const registerUsers = createAsyncThunk(
  "user/register",
  async ({ email, password, agreement_required }: TFormAuthorization) => {
    const res = await registerUser(email, password, agreement_required!);
    localStorage.setItem("accessToken", res.accessToken);
    localStorage.setItem("refreshToken", res.refreshToken);
    return res;
  },
);

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }: TFormAuthorization) => {
    const res = await login(email, password!);
    localStorage.setItem("accessToken", res.accessToken);
    localStorage.setItem("refreshToken", res.refreshToken);
    return res;
  },
);