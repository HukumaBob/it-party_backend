import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../hooks.ts";
import {API} from "../constants.ts";

type TError = { statusCode: number; statusText: string };
type TErrorDetailed = TError & Record<string, string[]>;
type TResponseError = TError | TErrorDetailed | null | undefined;
type TStatus = 'idle' | 'loading' | 'success' | 'error';
type TUserProfile = {
  "id": number;
  "phone": string;
  "place_of_work": string;
  "position": string;
  "online": boolean;
  "offline": boolean;
  "agreement_optional": boolean;
  "date_of_birth": string;
  "hobby": string;
  "values": string;
  "aims": string;
  "cv": string;
  "motivation": string;
  "specialization": number;
  "experience": number;
  "familystatus": number;
  "education": number;
  "income": number;
  "country": number;
  "stacks": number[],
  "first_name": string;
  "last_name": string;
  "email": string;
  "user_photo": string;
  "notification": number;
  "receive_notifications": boolean;
  "notification_email": boolean;
  "notification_sms": boolean;
  "notification_registration_approval": boolean;
  "notification_event": boolean;
}
type TInitialState = {
  data: TUserProfile;
  statusGetProfile: TStatus;
  statusUpdateProfile: TStatus;
  statusUpdateAvatar: TStatus;
  statusDeleteUser: TStatus;
  errorGetProfile: string | undefined | null;
  errorUpdateProfile: TResponseError;
  errorUpdateAvatar: TResponseError;
  errorDeleteUser: TResponseError;
  modalEditAvatarIsOpen: boolean;
};

export const getUserProfile =
  createAsyncThunk<TUserProfile, undefined, { rejectValue: string; state: RootState }>(
    'get_user_profile',
    async function (_, {rejectWithValue, getState}) {
      try {
        const accessToken = getState().authorization.accessToken;
        const response = await fetch(API.USER_PROFILE, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${accessToken}`,
          }
        })
        if (!response.ok) {
          return rejectWithValue(response.statusText);
        }
        const data: TUserProfile = await response.json();
        return data
      } catch (err) {
        return rejectWithValue(err instanceof Error ? err.message : 'unknown error');
      }
    }
  );

export const updateUserProfile =
  createAsyncThunk<TUserProfile, Partial<TUserProfile>, { rejectValue: TResponseError; state: RootState }>(
    'update_user_profile',
    async function (formData, {rejectWithValue, getState}) {
      const accessToken = getState().authorization.accessToken;
      const response = await fetch(API.USER_PROFILE, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData),
      })
      if (!response.ok) {
        const {status: statusCode, statusText} = response;
        if ([500, 404].includes(statusCode)) {
          return rejectWithValue({statusCode, statusText});
        }
        const errorData = await response.json();
        return rejectWithValue({statusCode, statusText, ...errorData});
      }
      const data: TUserProfile = await response.json();
      return data
    }
  );

export const updateUserAvatar =
  createAsyncThunk<TUserProfile, File, { rejectValue: TResponseError; state: RootState }>(
    'update_user_avatar',
    async function (imageFile, {rejectWithValue, getState}) {
      const accessToken = getState().authorization.accessToken;
      const formData = new FormData();
      formData.append("user_photo", imageFile);
      const response = await fetch(API.USER_PROFILE, {
        method: "PATCH",
        headers: {"authorization": `Bearer ${accessToken}`},
        body: formData,
      })
      if (!response.ok) {
        const {status: statusCode, statusText} = response;
        if ([500, 404].includes(statusCode)) {
          return rejectWithValue({statusCode, statusText});
        }
        const errorData = await response.json();
        return rejectWithValue({statusCode, statusText, ...errorData});
      }
      const data: TUserProfile = await response.json();
      return data
    }
  );

export const deleteUserProfile =
  createAsyncThunk<undefined, undefined, { rejectValue: TResponseError; state: RootState }>(
    'delete_user_profile',
    async function (_, {rejectWithValue, getState}) {
      const accessToken = getState().authorization.accessToken;
      const response = await fetch(API.DELETE_USER, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${accessToken}`,
        },
      })
      if (!response.ok) {
        const {status: statusCode, statusText} = response;
        if ([500, 404].includes(statusCode)) {
          return rejectWithValue({statusCode, statusText});
        }
        const errorData = await response.json();
        return rejectWithValue({statusCode, statusText, ...errorData});
      }
    }
  );

const initialState: TInitialState = {
  data: {} as TUserProfile,
  statusGetProfile: 'idle',
  statusUpdateProfile: 'idle',
  statusUpdateAvatar: 'idle',
  statusDeleteUser: 'idle',
  errorGetProfile: null,
  errorUpdateProfile: null,
  errorUpdateAvatar: null,
  errorDeleteUser: null,
  modalEditAvatarIsOpen: false,
};

const profileSlice = createSlice({
  name: "profile_user",
  initialState,
  reducers: {
    setModalEditAvatar: (state, action: PayloadAction<boolean>) => {
      const payload = action.payload;
      state.modalEditAvatarIsOpen = payload;
      if (!payload) {
        state.statusUpdateAvatar = 'idle';
      }
    },
    logoutProfile: (state) => {
      Object.assign(state, initialState);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.statusGetProfile = 'loading';
        state.errorGetProfile = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.data = action.payload
        state.statusGetProfile = 'success';
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.statusGetProfile = 'error';
        state.errorGetProfile = action.payload;
      })

      .addCase(updateUserProfile.pending, (state) => {
        state.statusUpdateProfile = 'loading';
        state.errorUpdateProfile = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusUpdateProfile = 'success';
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.statusUpdateProfile = 'error';
        state.errorUpdateProfile = action.payload;
      })

      .addCase(updateUserAvatar.pending, (state) => {
        state.statusUpdateAvatar = 'loading';
        state.errorUpdateAvatar = null;
      })
      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusUpdateAvatar = 'success';
      })
      .addCase(updateUserAvatar.rejected, (state, action) => {
        state.statusUpdateAvatar = 'error';
        state.errorUpdateAvatar = action.payload;
      })

      .addCase(deleteUserProfile.pending, (state) => {
        state.statusDeleteUser = 'loading';
        state.errorDeleteUser = null;
      })
      .addCase(deleteUserProfile.fulfilled, (state) => {
        state.data = {} as TUserProfile;
        state.statusDeleteUser = 'success';
      })
      .addCase(deleteUserProfile.rejected, (state, action) => {
        state.statusDeleteUser = 'error';
        state.errorDeleteUser = action.payload;
      })
  },
});

export const {setModalEditAvatar, logoutProfile} = profileSlice.actions;
export default profileSlice.reducer;
