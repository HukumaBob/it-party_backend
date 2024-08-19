import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../hooks.ts";
import {API} from "../constants.ts";

type TError = { statusCode: number; statusText: string } | string | null | undefined;
type TSpecialization = {
  id: number;
  specialization: string;
  index: number;
};
type TSpeaker = {
  id: number;
  foto?: string;
  name: string;
  info?: string;
  specializations?: (number | string)[];
};
type TGallery = {
  id: number;
  event_photo: string;
  caption: string;
};
type Event = {
  id: number;
  speakers: TSpeaker[];
  gallery: TGallery[];
  form_template: string | null;
  specializations: TSpecialization[];
  event_admin: [];
  logo: string;
  name: string;
  date: string;
  time: string;
  address: string;
  description: string;
  online: boolean;
  offline: boolean;
  record_link: string | null;
  stream: string | null;
  is_archive: boolean;
  city: number;
  user_application_status: 'not_applied' | 'pending' | 'approved' | 'rejected' | 'finalized' | 'is_favorite';
};
type TInitialState = {
  data: Event;
  loading: boolean;
  error: TError;
};

export const getEvent =
  createAsyncThunk<Event, string, { rejectValue: TError; state: RootState }>(
    "fetch_event_data",
    async (id, {rejectWithValue, getState}) => {
      try {
        const {isAuthorized, accessToken} = getState().authorization;
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        }
        if (isAuthorized) {
          headers["Authorization"] = `Bearer ${accessToken}`;
        }
        const response = await fetch(`${API.EVENT_LIST}/${id}`, {
          method: "GET",
          headers: headers,
        });
        if (!response.ok) {
          const {status: statusCode, statusText} = response;
          return rejectWithValue({statusCode, statusText});
        }
        const data: Event = await response.json();
        return data;
      } catch (err) {
        return rejectWithValue(err instanceof Error ? err.message : 'unknown error');
      }
    }
  );

const initialState: TInitialState = {
  data: {} as Event,
  loading: true,
  error: null,
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEvent.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = eventSlice.actions;
export default eventSlice.reducer;
