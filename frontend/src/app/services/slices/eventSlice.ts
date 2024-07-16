import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {BASE_URL, EVENTS_API_ENDPOINT} from "../../api/constants";

type TSpecialization = {
  id: number;
  specialization: string;
  index: number;
};

type TSpeaker = {
  id: number;
  foto: string;
  name: string;
  info: string;
  specializations: (number | string)[];
};

type TGallery = {
  id: number;
  event_photo: string;
  caption: string;
}

type Event = {
  id: number;
  speakers: TSpeaker[];
  form_template: string | null;
  specializations: TSpecialization[];
  logo: string;
  name: string;
  date: string;
  time: string;
  address: string;
  description: string;
  gallery: TGallery[];
  online: boolean;
  offline: boolean;
  city: number;
}

type TInitialState = {
  data: Event;
  loading: boolean;
  error: string | null;
}

export const getEvent = createAsyncThunk<Event, string, { rejectValue: string }>(
  "fetch_event_data",
  async (id, {rejectWithValue}) => {

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    }
    if (localStorage.getItem('accessToken')) {
      headers["Authorization"] = `Bearer ${localStorage.getItem('accessToken')}`;
    }

    const response = await fetch(`${BASE_URL}${EVENTS_API_ENDPOINT}/${id}`, {
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
        const data = action.payload

        const specializationsObj = data.specializations.reduce((acc: Record<string, string>, current) => {
          acc[current.id] = current.specialization
          return acc
        }, {})
        data.speakers = data.speakers.map(item => {
          return {
            ...item,
            specializations: item.specializations.map(specializationIndex => specializationsObj[specializationIndex])
          }
        })
        state.data = data;
        state.loading = false;
        state.error = null;
      })
      .addCase(getEvent.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error"
      });
  },
});

export const {} = eventSlice.actions;
export default eventSlice.reducer;
