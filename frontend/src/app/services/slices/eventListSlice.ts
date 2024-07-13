import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {BASE_URL, EVENTS_API_ENDPOINT} from "../../api/constants";
import dayjs from "dayjs";

type TOption = {
  value: number;
  label: string;
}

type TFilters = {
  name: string;
  specializations: Record<string, boolean>;
  city: TOption | null;
  online: boolean;
  date_before: string | null;
  date_after: string | null;
  offset: number;
  limit: number;
}

type TEvent = {
  id: number;
  info: string;
  name: string;
  description: string;
  logo: string;
  date: string;
  time: string;
  user_application_status: 'not_applied' | 'pending' | 'approved' | 'rejected' | 'is_favorite';
}

type TInitialState = {
  data: TEvent[];
  loading: boolean;
  error: string | null;
  filters: TFilters;
  itemsCount: number;
  pageNumber: number;
  pageCount: number;
  default_date_after: string;
}

type TResponse = {
  results: TEvent[];
  count: number;
}

export const getEventList =
  createAsyncThunk<TResponse, undefined, { rejectValue: string; state: { eventList: TInitialState } }>
  ("fetch_event_list",
    async (_, {rejectWithValue, getState}) => {
      const {
        limit,
        offset,
        name,
        city,
        online,
        date_after,
        date_before,
        specializations,
      } = getState().eventList.filters;
      const default_date_after = getState().eventList.default_date_after;

      const search = new URLSearchParams()
      search.append("limit", String(limit))
      search.append("offset", String(offset))
      name && search.append("name", name);
      city && search.append("city", String(city.value))
      online && search.append("online", 'true')
      search.append("date_after", date_after ? date_after : default_date_after)
      date_before && search.append("date_before", date_before)
      Object.keys(specializations).forEach(id => {
        search.append("specializations", id)
      });

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      }
      if (localStorage.getItem('accessToken')) {
        headers["Authorization"] = `Bearer ${localStorage.getItem('accessToken')}`;
      }

      try {
        const response = await fetch(`${BASE_URL}${EVENTS_API_ENDPOINT}?${search.toString()}`, {
          method: "GET",
          headers: headers
        });
        if (!response.ok) return rejectWithValue(response.statusText);
        const data: TResponse = await response.json();
        return data;
      } catch (err) {
        return rejectWithValue(err instanceof Error ? err.message : 'unknown error');
      }
    },
  );

const initialState: TInitialState = {
  data: [],
  loading: false,
  error: null,
  filters: {
    name: '',
    city: null,
    online: false,
    specializations: {},
    date_before: null,
    date_after: null,
    offset: 0,
    limit: 0,
  },
  itemsCount: 0, // нигде не используется, для информативности
  pageNumber: 1,
  pageCount: 0,
  default_date_after: dayjs().format('YYYY-MM-DD')
};

const resetPagination = (state: TInitialState) => {
  state.filters.offset = 0;
  state.pageNumber = 1;
};

const eventListSlice = createSlice({
  name: 'eventList',
  initialState,
  reducers: {
    setNameFilter(state, action: PayloadAction<string>) {
      state.filters.name = action.payload
      resetPagination(state)
    },
    setSpecializationFilter(state, action: PayloadAction<{ id: number, type: string }>) {
      const {type, id} = action.payload
      if (type === 'add') {
        state.filters.specializations[id] = true;
      }
      if (type === 'remove') {
        delete state.filters.specializations[id]
      }
      resetPagination(state)
    },
    setDateBeforeFilter(state, action: PayloadAction<string>) {
      state.filters.date_before = action.payload
      resetPagination(state)
    },
    setDateAfterFilter(state, action: PayloadAction<string>) {
      state.filters.date_after = action.payload
      resetPagination(state)
    },
    setCityFilter(state, action: PayloadAction<TOption>) {
      state.filters.city = action.payload
      resetPagination(state)
    },
    setOnlineFilter(state) {
      state.filters.online = !state.filters.online
      resetPagination(state)
    },
    clearCityFilter(state) {
      state.filters.city = null
      resetPagination(state)
    },
    clearDateAfterFilter(state) {
      state.filters.date_before = null
      resetPagination(state)
    },
    clearDateBeforeFilter(state) {
      state.filters.date_after = null
      resetPagination(state)
    },
    clearSpecializationsFilter(state) {
      state.filters.specializations = {};
      resetPagination(state)
    },
    setEventListPageNumber(state, action: PayloadAction<number>) {
      const pageNumber = action.payload;
      const limit = state.filters.limit
      state.pageNumber = pageNumber;
      state.filters.offset = (pageNumber - 1) * limit
    },
    setPageLimit(state, action: PayloadAction<number>) {
      state.filters.limit = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEventList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEventList.fulfilled, (state, action: PayloadAction<TResponse>) => {
        const {results, count} = action.payload;
        state.data = results
        state.itemsCount = count
        state.loading = false
        state.error = null;

        state.pageCount = Math.ceil(count / state.filters.limit)
      })
      .addCase(getEventList.rejected, (state: any, action: PayloadAction<string | undefined>) => {
        state.error = action.payload;
        state.loading = false;
        state.data = []
      })
  },
});

export const {
  setCityFilter,
  setSpecializationFilter,
  setNameFilter,
  setOnlineFilter,
  setDateBeforeFilter,
  setDateAfterFilter,
  clearCityFilter,
  clearDateAfterFilter,
  clearDateBeforeFilter,
  clearSpecializationsFilter,
  setEventListPageNumber,
  setPageLimit
} = eventListSlice.actions;
export default eventListSlice.reducer;
