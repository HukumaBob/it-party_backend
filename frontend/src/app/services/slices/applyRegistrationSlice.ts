import {PayloadAction, createSlice, createAsyncThunk, UnknownAction} from "@reduxjs/toolkit";
import {API} from "../../api/constants";
import {RootState} from "../../../main.tsx";

type TRegistrationData = {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  place_of_work: string;
  position: string;
  specialization: number;
  experience: number;
  phone: string;
  online: boolean;
  offline: boolean;
  user_event_id: number;
};
type TApplyRegistrationFormData = {
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  email: string;
  phone: string;
  place_of_work: string;
  position: string;
  experience: number;
  specialization: number;
  online: boolean;
  offline: boolean;
};
type TInitialState = {
  inboundData: TRegistrationData | null;
  loadingGET: boolean;
  loadingPOST: boolean;
  isOpenModalSuccess: boolean;
  postApplicationResultMessage: string | undefined;
  error: string | undefined | null;
  eventId: number | null;
};

export const getRegistrationData =
  createAsyncThunk<TRegistrationData, number, { rejectValue: string; state: RootState }>
  ("fetch_registration_data",
    async (id, {rejectWithValue, getState}) => {
      const accessToken = getState().authorization.accessToken
      try {
        const response = await fetch(
          `${API.REGISTER_AND_APPLY}/${id}/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        if (!response.ok) {
          return rejectWithValue(response.statusText);
        }
        const data: TRegistrationData = await response.json();
        return data
      } catch (err) {
        return rejectWithValue(err instanceof Error ? err.message : 'unknown error');
      }
    },
  );

export const applyRegistration =
  createAsyncThunk<string | undefined, TApplyRegistrationFormData, { rejectValue: string; state: RootState }>
  ("post_apply_registration",
    async (data, {rejectWithValue, getState}) => {
      const accessToken = getState().authorization.accessToken
      const {id, ...restData} = data;

      try {
        const response = await fetch(
          `${API.SUBMIT_APPLICATION}/${id}/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(restData),
          },
        );
        if (response.ok) {
          const result: { message: string } = await response.json();
          return result.message
        } else {
          const errorBody = await response.json();
          rejectWithValue(JSON.stringify(errorBody));
        }
      } catch (err) {
        return rejectWithValue(err instanceof Error ? err.message : 'unknown error');
      }
    });

const initialState: TInitialState = {
  inboundData: null,
  loadingGET: false,
  loadingPOST: false,
  isOpenModalSuccess: false,
  postApplicationResultMessage: undefined,
  error: null,
  eventId: null
};

const isError = (action: UnknownAction) => action.type.endsWith('rejected');

const applyRegistrationSlice = createSlice({
  name: "applyRegistration",
  initialState,
  reducers: {
    closeModalSuccess(state) {
      state.isOpenModalSuccess = false;
      state.eventId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRegistrationData.pending, (state) => {
        state.loadingGET = true;
        state.error = null;
      })
      .addCase(getRegistrationData.fulfilled, (state, action) => {
        state.inboundData = action.payload;
        state.loadingGET = false
        state.eventId = action.meta.arg
      })

      .addCase(applyRegistration.pending, (state) => {
        state.loadingPOST = true;
        state.error = null;
      })
      .addCase(applyRegistration.fulfilled, (state, action) => {
        state.postApplicationResultMessage = action.payload;
        state.isOpenModalSuccess = true;
        state.loadingPOST = false;
      })

      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loadingGET = false;
        state.loadingPOST = false;
      });
  },
});

export const {closeModalSuccess} = applyRegistrationSlice.actions;
export default applyRegistrationSlice.reducer;
