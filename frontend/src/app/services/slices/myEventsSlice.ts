import {PayloadAction, createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "../../../main.tsx";
import {API} from "../../api/constants";

type TEvent = {
  id: number;
  info: string;
  name: string;
  description: string;
  logo: string;
  date: string;
  time: string;
  user_application_status: 'not_applied' | 'pending' | 'approved' | 'rejected';
}

type TInitialState = {
  pastEvents: TEvent[],
  futureEvents: TEvent[],
  allEvents: TEvent[],
  loading: boolean;
  error: string | null | undefined;
};

type TResponse = {
  results: TEvent[];
}

export const getMyEventsList =
  createAsyncThunk<TResponse, undefined, { rejectValue: string; state: RootState }>(
    "fetch_my_event_List",
    async (_, {rejectWithValue, getState}) => {
      const accessToken = getState().authorization.accessToken
      try {
        const response = await fetch(`${API.EVENT_LIST}?applied=true`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) return rejectWithValue(response.statusText);
        const data: TResponse = await response.json();
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

const myEventsSlice = createSlice({
    name: "myEvents",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getMyEventsList.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getMyEventsList.fulfilled, (state, action: PayloadAction<TResponse>) => {
          const {results} = action.payload;

          const now = new Date();
          const pastEvents = results.filter(event => new Date(`${event.date}T${event.time}`) < now);
          const futureEvents = results.filter(event => new Date(`${event.date}T${event.time}`) >= now);

          state.pastEvents = pastEvents;
          state.futureEvents = futureEvents;
          state.allEvents = results

          state.loading = false
        })
        .addCase(getMyEventsList.rejected, (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload;
          state.loading = false;
          state.pastEvents = [];
          state.futureEvents = [];
          state.allEvents = [];
        })
    },
  }
);

export default myEventsSlice.reducer;
