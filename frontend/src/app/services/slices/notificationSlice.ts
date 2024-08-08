import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {API} from "../constants.ts";

type TNotification = {
  id: number;
  notification: string;
  minutes_before_notification: number;
};
type TOption = { value: number; label: string };
type TInitialState = {
  data: TNotification[];
  notificationSelectOptions: TOption[]
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | undefined | null;
};

export const getNotificationList =
  createAsyncThunk<TNotification[], undefined, { rejectValue: string }>(
    'fetch_notification_list',
    async function (_, {rejectWithValue}) {
      try {
        const response = await fetch(API.NOTIFICATION_LIST, {
          method: "GET",
          headers: {"Content-Type": "application/json"},
        })
        if (!response.ok) {
          return rejectWithValue(response.statusText);
        }
        const data: TNotification[] = await response.json();
        return data
      } catch (err) {
        return rejectWithValue(err instanceof Error ? err.message : 'unknown error');
      }
    }
  );

const initialState: TInitialState = {
  data: [],
  notificationSelectOptions: [],
  status: 'idle',
  error: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNotificationList.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getNotificationList.fulfilled, (state, action) => {
        const data = action.payload;
        state.data = data;
        state.notificationSelectOptions = data.map(({id, notification}) => ({value: id, label: notification}))
        state.status = 'success';
      })
      .addCase(getNotificationList.rejected, (state, action) => {
        state.data = [];
        state.notificationSelectOptions = [];
        state.error = action.payload;
        state.status = 'error';
      })
  },
});

export default notificationSlice.reducer;
