import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {API} from "../constants.ts";

type TFormType = 'authorization' | 'profile' | null;
type TInitialState = {
  modalIsOpen: boolean;
  formType: TFormType;
  email: string | null;
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;
};

export const resetPassword =
  createAsyncThunk<undefined, { email: string }, { rejectValue: string }>(
    'post_reset_password',
    async function (formData, {rejectWithValue}) {
      try {
        const response = await fetch(API.RESET_PASSWORD, {
          method: "POST",
          headers: {"Content-Type": "application/json;charset=utf-8"},
          body: JSON.stringify(formData),
        })
        if (!response.ok) {
          return rejectWithValue(response.statusText);
        }
      } catch (err) {
        return rejectWithValue(err instanceof Error ? err.message : 'unknown error');
      }
    }
  );

const initialState: TInitialState = {
  modalIsOpen: false,
  formType: null,
  email: null,
  status: 'idle',
  error: null,
};

const profileResetPasswordSlice = createSlice({
  name: "profile_reset_password",
  initialState,
  reducers: {
    setModalResetPassword: (state, action: PayloadAction<{ open: boolean, formType?: TFormType }>) => {
      const {open, formType} = action.payload;
      state.modalIsOpen = open;
      state.formType = formType || null;
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.status = 'loading';
        state.email = null;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.status = 'success';
        state.email = action.meta.arg.email;
      })
      .addCase(resetPassword.rejected, (state: any, action) => {
        state.error = action.payload;
        state.status = 'error';
        state.email = null;
      })
  },
});

export const {setModalResetPassword} = profileResetPasswordSlice.actions;
export default profileResetPasswordSlice.reducer;
