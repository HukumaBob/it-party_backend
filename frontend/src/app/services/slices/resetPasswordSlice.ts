import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {API} from "../../api/constants";

type TFormData = {
  email: string;
}

type TInitialState = {
  modalIsOpen: boolean;
  formType: 'authorization' | 'profile' | null;
  email: string | null;
  status: string | null;
  loading: boolean;
  error: string | null;
}

type TResponse = {
  status: string;
  email: string;
}

export const resetPassword = createAsyncThunk<TResponse, TFormData, { rejectValue: string }>(
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
      return {status: 'success', email: formData.email}
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'unknown error');
    }
  }
);

const initialState: TInitialState = {
  modalIsOpen: false,
  formType: null,
  email: null,
  status: null,
  loading: false,
  error: null,
};

const resetPasswordSlice = createSlice({
  name: "reset_password",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = null;
    },
    setModalResetPassword: (state, action: PayloadAction<{ open: boolean, formType?: 'authorization' | 'profile' }>) => {
      const {open, formType} = action.payload;
      state.modalIsOpen = open;
      state.formType = formType || null;
      state.status = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.status = null;
        state.email = null;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.status = action.payload.status;
        state.email = action.payload.email;
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state: any, action) => {
        state.error = action.payload;
        state.loading = false;
        state.status = null;
        state.email = null;
      })
  },
});

export const {resetStatus, setModalResetPassword} = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer;
