import {PayloadAction, createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "../hooks.ts";
import {API} from "../constants.ts";

type TUser = {
  id: number;
  first_name: string;
  last_name: string;
  place_of_work: string;
  position: string;
  experience: string;
  status: string;
};
type TApplicant = {
  id: number;
  event_name: string;
  event_date: string;
  city_name: string;
  profile_events: TUser;
  application_status: 'pending' | 'approved' | 'rejected';
}
type TPatchData = {
  id: number;
  application_status: string;
  explanation?: string;
}
type TInitialState = {
  data: TApplicant[];
  loading: boolean;
  error: string | null | undefined;
  patchSuccess: boolean | null;
  patchLoading: boolean;
  patchError: string | null | undefined;
  isModalRejectApplicantOpen: boolean;
  applicantStatusId: number | undefined;
  applicantFullName: string | undefined;
};

export const patchAdminApplicantStatus =
  createAsyncThunk<undefined, TPatchData, { rejectValue: string; state: RootState }>(
    "patch_admin_applicantStatus",
    async (patch_data, {rejectWithValue, getState}) => {
      const accessToken = getState().authorization.accessToken
      const {id, application_status, explanation} = patch_data
      const body: Record<string, string> = {application_status}
      if (explanation) {
        body.explanation = explanation;
      }

      try {
        const response = await fetch(`${API.USER_EVENT_STATUS}${id}/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${accessToken}`,
          },
          body: JSON.stringify(body)
        });
        if (!response.ok) return rejectWithValue(response.statusText);
      } catch (err) {
        return rejectWithValue(err instanceof Error ? err.message : 'unknown error');
      }
    },
  );

export const getAdminApplicantsList =
  createAsyncThunk<TApplicant[], number, { rejectValue: string; state: RootState }>(
    "fetch_admin_applicants_List",
    async (id, {rejectWithValue, getState}) => {
      try {
        const accessToken = getState().authorization.accessToken
        const response = await fetch(`${API.ADMIN_EVENT_LIST}${id}/user_events`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) return rejectWithValue(response.statusText);
        const data: TApplicant[] = await response.json();
        return data
      } catch (err) {
        return rejectWithValue(err instanceof Error ? err.message : 'unknown error');
      }
    },
  );

const initialState: TInitialState = {
  data: [],
  loading: true,
  error: null,
  patchSuccess: null,
  patchLoading: false,
  patchError: null,
  isModalRejectApplicantOpen: false,
  applicantStatusId: undefined,
  applicantFullName: undefined
};

const adminApplicantsSlice = createSlice({
  name: "adminApplicants",
  initialState,
  reducers: {
    openModalRejectApplicant: (state, action: PayloadAction<{ id: number, fullName: string }>) => {
      state.isModalRejectApplicantOpen = true;
      const {id, fullName} = action.payload
      state.applicantStatusId = id;
      state.applicantFullName = fullName;
    },
    closeModalRejectApplicant: (state) => {
      state.isModalRejectApplicantOpen = false;
      state.applicantStatusId = undefined
      state.applicantFullName = undefined
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminApplicantsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdminApplicantsList.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false
      })
      .addCase(getAdminApplicantsList.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(patchAdminApplicantStatus.pending, (state) => {
        state.patchLoading = true;
        state.patchSuccess = null;
        state.patchError = null;
      })
      .addCase(patchAdminApplicantStatus.fulfilled, (state) => {
        state.patchSuccess = true;
        state.patchLoading = false
      })
      .addCase(patchAdminApplicantStatus.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.patchError = action.payload;
        state.patchSuccess = false;
        state.patchLoading = false;
      })
  },
});

export const {openModalRejectApplicant, closeModalRejectApplicant} = adminApplicantsSlice.actions;
export default adminApplicantsSlice.reducer;
