import {PayloadAction, createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {AppDispatch, RootState} from '../hooks.ts';
import {API} from "../constants.ts";
import {logoutProfile} from "./profileSlice.ts";

type TError = { statusCode: number; statusText: string };
type TErrorLogin = TError & { detail: string };
type TErrorCreate = TError & { email: string[], password: string[] }
type TResponseError = TError | TErrorLogin | TErrorCreate | string | null | undefined;
type TFormType = 'login' | 'registration';
type TStatus = 'idle' | 'loading' | 'success' | 'error';
export type TInitialState = {
  modalIsOpen: boolean;
  modalAuthorizationSuccessIsOpen: boolean;
  formType: TFormType;
  refreshToken: string | null;
  accessToken: string | null;
  isAuthorized: boolean;

  statusLogin: TStatus;
  errorLogin: TResponseError;

  statusActivate: TStatus;
  errorActivate: TResponseError;
  activationTokenIsExpired: boolean;
  activationTokenNotFound: boolean;

  statusResendActivation: TStatus;
  errorResendActivation: TResponseError;

  statusCreate: TStatus;
  errorCreate: TResponseError;
  createUserIsExist: boolean;

  formError: string | null;
  userEmail: string | null;
};
type TFormDataCreate = {
  email: string;
  password: string;
  agreement_required?: boolean;
};
type TFormDataLogin = {
  email: string;
  password: string;
};
type TActivationData = {
  uid: string;
  token: string;
};
type TLoginResponse = {
  refresh: string;
  access: string;
};

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
          const {status: statusCode, statusText} = response;
          if ([500, 404].includes(statusCode)) {
            return rejectWithValue({statusCode, statusText});
          }
          const {email, password} = await response.json();
          return rejectWithValue({statusCode, statusText, email, password});
        }
      } catch (err) {
        return rejectWithValue(err instanceof Error ? err.message : 'unknown error');
      }
    }
  );

export const activateUser =
  createAsyncThunk<undefined, TActivationData, { rejectValue: TResponseError }>(
    'post_activate_user',
    async function (activationData, {rejectWithValue}) {
      try {
        const response = await fetch(API.USER_ACTIVATE, {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(activationData),
        })
        if (!response.ok) {
          const {status: statusCode, statusText} = response;
          if ([500, 404].includes(statusCode)) {
            return rejectWithValue({statusCode, statusText});
          }
          const errorData = await response.json();
          return rejectWithValue({statusCode, statusText, ...errorData});
        }
      } catch (err) {
        return rejectWithValue(err instanceof Error ? err.message : 'unknown error');
      }
    }
  );

export const resendActivation =
  createAsyncThunk<undefined, undefined, { rejectValue: TResponseError; state: RootState }>(
    'post_resend_activation',
    async function (_, {rejectWithValue, getState}) {
      try {
        const email = getState().authorization.userEmail
        const response = await fetch(API.RESEND_ACTIVATION, {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({email}),
        })
        if (!response.ok) {
          const {status: statusCode, statusText} = response;
          if ([500, 404].includes(statusCode)) {
            return rejectWithValue({statusCode, statusText});
          }
          const errorData = await response.json();
          return rejectWithValue({statusCode, statusText, ...errorData});
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
          const {status: statusCode, statusText} = response;
          if ([500, 404].includes(statusCode)) {
            return rejectWithValue({statusCode, statusText});
          }
          const {detail} = await response.json();
          return rejectWithValue({statusCode, statusText, detail});
        }
        const data: TLoginResponse = await response.json();
        return data
      } catch (err) {
        return rejectWithValue(err instanceof Error ? err.message : 'unknown error');
      }
    }
  );

export const logoutUser =
  createAsyncThunk<void, undefined, { dispatch: AppDispatch }>(
    'logout_user',
    async function (_, {dispatch}) {
      dispatch(logoutAuthorization());
      dispatch(logoutProfile());
    }
  );

export const initialState: TInitialState = {
  modalIsOpen: false,
  modalAuthorizationSuccessIsOpen: false,
  formType: 'login',
  refreshToken: null,
  accessToken: null,
  isAuthorized: false,

  statusLogin: 'idle',
  errorLogin: null,

  statusActivate: 'idle',
  errorActivate: null,
  activationTokenIsExpired: false,
  activationTokenNotFound: false,

  statusResendActivation: 'idle',
  errorResendActivation: null,

  statusCreate: 'idle',
  errorCreate: null,
  createUserIsExist: false,

  formError: null,
  userEmail: null,
};

export const authorizationSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    setOpenAuthorizationModal: (state, action: PayloadAction<boolean>) => {
      state.modalIsOpen = action.payload;
      if (!action.payload) {
        state.formType = 'login';
      }
    },
    setOpenAuthorizationSuccessModal: (state, action: PayloadAction<boolean>) => {
      state.modalAuthorizationSuccessIsOpen = action.payload;
      if (!action.payload) {
        state.userEmail = null;
        state.createUserIsExist = false;
        state.formType = 'login';
        state.statusResendActivation = 'idle';
        state.statusCreate = 'idle';
        state.errorCreate = null;
      }
    },
    setFormType: (state, action: PayloadAction<TFormType>) => {
      state.formType = action.payload;
    },
    logoutAuthorization: (state) => {
      state.refreshToken = null;
      state.accessToken = null;
      state.isAuthorized = false;
      state.statusLogin = 'idle';
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
            state.createUserIsExist = true;
            state.modalIsOpen = false;
            state.modalAuthorizationSuccessIsOpen = true;
            state.userEmail = action.meta.arg.email;
          }
        }
      })

      .addCase(activateUser.pending, (state) => {
        state.statusActivate = 'loading';
        state.errorActivate = null;
        state.activationTokenIsExpired = false;
      })
      .addCase(activateUser.fulfilled, (state) => {
        state.statusActivate = 'success';
      })
      .addCase(activateUser.rejected, (state, action) => {
        const error = action.payload;
        state.statusActivate = 'error';
        state.errorActivate = error;
        if (typeof error === 'object' && error !== null) {
          const statusCode = error.statusCode;
          if (statusCode === 403) {
            state.activationTokenIsExpired = true;
          }
          if (statusCode === 400) {
            console.log('asdf')
            state.activationTokenNotFound = true;
          }
        }
      })

      .addCase(resendActivation.pending, (state) => {
        state.statusResendActivation = 'loading';
        state.errorResendActivation = null;
      })
      .addCase(resendActivation.fulfilled, (state) => {
        state.statusResendActivation = 'success';
        state.createUserIsExist = false;
      })
      .addCase(resendActivation.rejected, (state, action) => {
        state.statusResendActivation = 'error';
        state.errorResendActivation = action.payload;
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
        if (state.formType === 'login') {
          state.modalIsOpen = false;
        }
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
      })
  },
});

export const {
  setOpenAuthorizationModal,
  setFormType,
  setOpenAuthorizationSuccessModal,
  logoutAuthorization
} = authorizationSlice.actions;
export default authorizationSlice.reducer;
