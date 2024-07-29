import {PayloadAction, createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {API} from "../../api/constants";

type TApplicationCounts = {
  approved: number;
  pending: number;
  rejected: number;
}

type TEvent = {
  id: number;
  name: string;
  logo: string;
  date: string;
  time: string;
  application_status_counts: TApplicationCounts;
}

type TInitialState = {
  pastEvents: TEvent[],
  futureEvents: TEvent[],
  allEvents: TEvent[],
  loading: boolean;
  error: string | null | undefined;
};

export const getAdminEventList = createAsyncThunk<TEvent[], undefined, { rejectValue: string }>(
  "fetch_admin_event_List",
  async (_, {rejectWithValue}) => {

    try {
      const response = await fetch(API.ADMIN_EVENT_LIST, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (!response.ok) return rejectWithValue(response.statusText);
      const result = await response.json();
      ////////////////////////// ------------temp
      const data: TEvent[] = result.map((item: Record<string, string>) => {
        return {
          ...item,
          date: "2024-08-05",
          time: "18:28:00",
          logo: "http://localhost:8000/media/images/example_Vi6GJKr.jpg"
        }
      })
      //////////////////////////
      return data
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'unknown error');
    }
  },
);

const initialState: TInitialState = {
  pastEvents: [],
  futureEvents: [],
  allEvents: [],
  loading: true,
  error: null,
};

const adminEventListSlice = createSlice({
    name: "adminEventList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getAdminEventList.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getAdminEventList.fulfilled, (state, action) => {
          const data = action.payload;

          const now = new Date();
          const pastEvents = data.filter(event => new Date(`${event.date}T${event.time}`) < now);
          const futureEvents = data.filter(event => new Date(`${event.date}T${event.time}`) >= now);

          state.pastEvents = pastEvents;
          state.futureEvents = futureEvents;
          state.allEvents = data
          state.loading = false
        })
        .addCase(getAdminEventList.rejected, (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload;
          state.loading = false;
          state.pastEvents = [];
          state.futureEvents = [];
          state.allEvents = [];
        })
    },
  }
);

export default adminEventListSlice.reducer;
