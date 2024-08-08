import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../hooks.ts";
import {API} from "../constants.ts";


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
}
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
}
type TInitialState = {
  data: Event;
  loading: boolean;
  error: string | null;
}

export const getEvent =
  createAsyncThunk<Event, string, { rejectValue: string; state: RootState }>(
    "fetch_event_data",
    async (id, {rejectWithValue, getState}) => {
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
        rejectWithValue(response.statusText ?? "Unknown error");
      }
      const data: Event = await response.json();
      return data;
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
      .addCase(getEvent.fulfilled, (state, action: PayloadAction<Event>) => {
        // const data = action.payload;

        // const specializationsObj = data.specializations.reduce((acc: Record<string, string>, current) => {
        //   acc[current.id] = current.specialization
        //   return acc
        // }, {})
        // data.speakers = data.speakers.map(item => {
        //   return {
        //     ...item,
        //     specializations: item.specializations.map(specializationIndex => specializationsObj[specializationIndex])
        //   }
        // })
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getEvent.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error"
      });
  },
});

export const {} = eventSlice.actions;
export default eventSlice.reducer;
