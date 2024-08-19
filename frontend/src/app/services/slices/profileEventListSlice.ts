import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../hooks.ts";
import {API} from "../constants.ts";
import dayjs from 'dayjs';

type TError = { statusCode: number; statusText: string } | string | null | undefined;
type TEvent = {
  id: number;
  info: string;
  name: string;
  description: string;
  logo: string;
  date: string;
  time: string;
  user_application_status: 'not_applied' | 'pending' | 'approved' | 'rejected';
};
type TResult = {
  count: number;
  results: TEvent[]
};
type TFavoriteActionType = 'add' | 'remove';
type TFavoriteAction = {
  id: number;
  type: TFavoriteActionType;
};
type TEventsType = | 'future' | 'past' | 'all';
type TStatus = 'idle' | 'loading' | 'success' | 'error';
type TInitialState = {
  data: { past: TEvent[]; future: TEvent[]; all: TEvent[] }
  status: { past: TStatus; future: TStatus; all: TStatus }
  error: { past: TError; future: TError; all: TError }
  count: { past: number; future: number; all: number }
  pageNumber: { past: number; future: number; all: number }
  pageCount: { past: number; future: number; all: number }
  offset: { past: number; future: number; all: number }
  limit: number;
};

export const getProfileEventList =
  createAsyncThunk<TResult, TEventsType, { rejectValue: TError; state: RootState }>(
    "fetch_profile_event_list",
    async (type, {rejectWithValue, getState}) => {
      try {
        const state = getState()
        const accessToken = state.authorization.accessToken
        const {limit, offset} = state.profileEventList

        const currentDate = dayjs().format('YYYY-MM-DD');

        const search = new URLSearchParams()
        search.append("applied", 'true');
        search.append("limit", String(limit));
        search.append("offset", String(offset[type]));
        type === 'past' && search.append("date_before", currentDate);
        type === 'future' && search.append("date_after", currentDate);

        const response = await fetch(`${API.EVENT_LIST}?${search.toString()}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) {
          const {status: statusCode, statusText} = response;
          return rejectWithValue({statusCode, statusText});
        }
        return await response.json();
      } catch (err) {
        return rejectWithValue(err instanceof Error ? err.message : 'unknown error');
      }
    },
  );

export const manageFavorite =
  createAsyncThunk<undefined, TFavoriteAction, { rejectValue: TError; state: RootState }>(
    "manage_favorite",
    async (action, {rejectWithValue, getState}) => {
      try {
        const {id, type} = action
        const endpoints = {
          add: `${API.REGISTER_AND_APPLY}/${id}/`,
          remove: `${API.REMOVE_FAVORITE}/${id}/`
        };
        const methods = {
          add: 'POST',
          remove: 'DELETE'
        };
        const accessToken = getState().authorization.accessToken
        const response = await fetch(endpoints[type], {
          method: methods[type],
          headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) {
          const {status: statusCode, statusText} = response;
          return rejectWithValue({statusCode, statusText});
        }
      } catch (err) {
        return rejectWithValue(err instanceof Error ? err.message : 'unknown error');
      }
    },
  );

const initialState: TInitialState = {
  data: {past: [], future: [], all: []},
  status: {past: 'idle', future: 'idle', all: 'idle'},
  error: {past: null, future: null, all: null},
  count: {past: 0, future: 0, all: 0},
  pageNumber: {past: 1, future: 1, all: 1},
  pageCount: {past: 0, future: 0, all: 0},
  offset: {past: 0, future: 0, all: 0},
  limit: 3,
};

const profileEventListSlice = createSlice({
    name: "profile_event_list",
    initialState,
    reducers: {
      setProfileEventListPageNumber(state, action: PayloadAction<{ type: TEventsType; pageNumber: number }>) {
        const {type, pageNumber} = action.payload;
        const getOffset = () => (pageNumber - 1) * state.limit;
        state.pageNumber[type] = pageNumber;
        state.offset[type] = getOffset()
      },
      setProfileEventListLimit(state, action: PayloadAction<number>) {
        state.limit = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getProfileEventList.pending, (state, action) => {
          const type = action.meta.arg;
          state.status[type] = 'loading';
          state.error[type] = null;
        })
        .addCase(getProfileEventList.fulfilled, (state, action) => {
          const type = action.meta.arg;
          const {results, count} = action.payload;
          state.status[type] = 'success';
          state.data[type] = results;
          state.count[type] = count;
          state.pageCount[type] = Math.ceil(count / state.limit);
        })
        .addCase(getProfileEventList.rejected, (state, action) => {
          const type = action.meta.arg;
          state.data[type] = [];
          state.count[type] = 0;
          state.pageCount[type] = 0;
          state.status[type] = 'error';
          state.error[type] = action.payload;
        })
    },
  }
);

export const {setProfileEventListPageNumber, setProfileEventListLimit} = profileEventListSlice.actions;
export default profileEventListSlice.reducer;
