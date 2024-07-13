import {PayloadAction, createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {BASE_URL, ADMIN_EVENT_LIST, USER_EVENT_STATUS} from "../../api/constants";

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
  patchLoading: boolean;
  patchError: string | null | undefined;
  isModalRejectApplicantOpen: boolean;
  applicantStatusId: number | undefined;
  applicantFullName: string | undefined;
};

// const applicantsTest = [
//   {
//     id: 1,
//     name: "Владимир Белоголовцев",
//     company: "Sony Lorem ipsum dolor sit amet quo sit suscipit. Blanditiis",
//     post: "Designer Lorem ipsum dolor sit amet, consectetur",
//     experience: "Более 6 лет",
//     status: "Ожидает",
//   },
// ];

export const patchAdminApplicantStatus = createAsyncThunk<string, TPatchData, { rejectValue: string }>(
  "patch_admin_applicantStatus",
  async (patch_data, {rejectWithValue}) => {
    const {id, application_status, explanation} = patch_data
    const body: Record<string, string> = {application_status}
    if (explanation) {
      body.explanation = explanation;
    }

    try {
      const response = await fetch(`${BASE_URL}${USER_EVENT_STATUS}/${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(body)
      });
      if (!response.ok) return rejectWithValue(response.statusText);
      // const data = await response.json();
      ////////////////////////////////////
      ////////////////////////////////////
      ////////////////////////////////////
      return 'data'
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'unknown error');
    }
  },
);

export const getAdminApplicantsList = createAsyncThunk<TApplicant[], number, { rejectValue: string }>(
  "fetch_admin_applicants_List",
  async (id, {rejectWithValue}) => {

    try {
      const response = await fetch(`${BASE_URL}${ADMIN_EVENT_LIST}/${id}/user_events`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${localStorage.getItem("accessToken")}`,
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
      .addCase(getAdminApplicantsList.pending, (state, action) => {
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

      .addCase(patchAdminApplicantStatus.pending, (state, action) => {
        state.patchLoading = true;
        state.patchError = null;
      })
      .addCase(patchAdminApplicantStatus.fulfilled, (state, action) => {
        // state.data = action.payload;
        state.patchLoading = false
      })
      .addCase(patchAdminApplicantStatus.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.patchError = action.payload;
        state.patchLoading = false;
      })
  },
});

export const {openModalRejectApplicant, closeModalRejectApplicant} = adminApplicantsSlice.actions;
export default adminApplicantsSlice.reducer;
