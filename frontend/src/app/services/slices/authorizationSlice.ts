import {PayloadAction, createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {API} from "../../api/constants.ts";

type TError = { statusCode: number; statusText: string };
type TErrorLogin = TError & { detail: string };
type TErrorCreate = TError & { email: string[], password: string[] }
type TResponseError = string | TErrorLogin | TErrorCreate | null | undefined;
type TFormType = 'login' | 'registration';
type TStatus = 'idle' | 'loading' | 'success' | 'error';
type TInitialState = {
  modalIsOpen: boolean;
  modalAuthorizationSuccessIsOpen: boolean;
  formType: TFormType;

  refreshToken: string | null;
  accessToken: string | null;
  isAuthorized: boolean;
  statusLogin: TStatus;
  errorLogin: TResponseError;

  statusCreate: TStatus;
  errorCreate: TResponseError;

  formError: string | null;
  userEmail: string | null;
};
type TFormDataLogin = {
  email: string;
  password: string;
}
type TFormDataCreate = {
  email: string;
  password: string;
  agreement_required?: boolean;
}
type TLoginResponse = {
  refresh: string;
  access: string;
}

export const createUser =
  createAsyncThunk<undefined, TFormDataCreate, { rejectValue: TResponseError }>(
    'post_create_user',
    async function (formData, {rejectWithValue}) {
      try {
        const response = await fetch(API.USERS, {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(formData),
        })
        if (!response.ok) {
          const errorData = await response.json();
          return rejectWithValue({
            statusCode: response.status,
            statusText: response.statusText,
            email: errorData.email,
            password: errorData.password
          });
        }
      } catch (err) {
        return rejectWithValue(err instanceof Error ? err.message : 'unknown error');
      }
    }
  );

export const loginUser =
  createAsyncThunk<TLoginResponse, TFormDataLogin, { rejectValue: TResponseError }>(
    'post_login_user',
    async function (formData, {rejectWithValue}) {
      try {
        const response = await fetch(API.LOGIN, {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(formData),
        })
        if (!response.ok) {
          const errorData = await response.json();
          return rejectWithValue({
            statusCode: response.status,
            statusText: response.statusText,
            detail: errorData.detail
          });
        }
        const data: TLoginResponse = await response.json();
        return data
      } catch (err) {
        return rejectWithValue(err instanceof Error ? err.message : 'unknown error');
      }
    }
  );

const initialState: TInitialState = {
  modalIsOpen: false,
  modalAuthorizationSuccessIsOpen: false,
  formType: 'login',
  refreshToken: null,
  accessToken: null,
  isAuthorized: false,

  statusLogin: 'idle',
  errorLogin: null,

  statusCreate: 'idle',
  errorCreate: null,

  formError: null,
  userEmail: null,
};

export const authorizationSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    setOpenAuthorizationModal: (state, action: PayloadAction<boolean>) => {
      state.modalIsOpen = action.payload;
    },
    setOpenAuthorizationSuccessModal: (state, action: PayloadAction<boolean>) => {
      state.modalAuthorizationSuccessIsOpen = action.payload;
    },
    setFormType: (state, action: PayloadAction<TFormType>) => {
      state.formType = action.payload;
    },
    logoutUser: (state) => {
      state.refreshToken = null;
      state.accessToken = null;
      state.isAuthorized = false;
      state.userEmail = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.statusCreate = 'loading';
        state.errorCreate = null;
        state.formError = null;
        state.userEmail = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.statusCreate = 'success';
        state.userEmail = action.meta.arg.email;
        state.modalIsOpen = false;
        state.modalAuthorizationSuccessIsOpen = true;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.errorCreate = action.payload;
        state.statusCreate = 'error';
        state.userEmail = null;
        if (state.errorCreate && typeof state.errorCreate === 'object' && 'email' in state.errorCreate) {
          const userIsExist = state.errorCreate.email
            .find((item: string) => item === 'user with this email already exists.')
          if (userIsExist) {
            state.formError = 'пользователь с таким email уже существует'
          }
        }
      })
      .addCase(loginUser.pending, (state) => {
        state.statusLogin = 'loading';
        state.errorLogin = null;
        state.formError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.statusLogin = 'success';
        state.refreshToken = action.payload.refresh;
        state.accessToken = action.payload.access;
        state.isAuthorized = true;
        state.modalIsOpen = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.errorLogin = action.payload;
        state.statusLogin = 'error';
        if (
          state.errorLogin &&
          typeof state.errorLogin === 'object' &&
          'statusCode' in state.errorLogin &&
          state.errorLogin.statusCode === 401
        ) {
          state.formError = 'неправильный логин или пароль'
        }
      });
  },
});

export const {
  setOpenAuthorizationModal,
  setFormType,
  logoutUser,
  setOpenAuthorizationSuccessModal
} = authorizationSlice.actions;
export default authorizationSlice.reducer;
