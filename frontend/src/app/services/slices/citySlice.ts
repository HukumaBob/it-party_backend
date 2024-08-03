import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {API} from "../../api/constants";

type TCity = {
  id: number;
  name: string;
  country_id: number;
}

type TInitialState = {
  data: TCity[];
  cityList: Record<string, string>;
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | undefined | null;
}

export const getCityList = createAsyncThunk<TCity[], undefined, { rejectValue: string }>(
  'fetch_city_list',
  async function (_, {rejectWithValue}) {
    try {
      const response = await fetch(API.CITY_LIST, {
        method: "GET",
        headers: {"Content-Type": "application/json"},
      })
      if (!response.ok) {
        return rejectWithValue(response.statusText);
      }
      const data: TCity[] = await response.json();
      return data
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'unknown error');
    }
  }
);

const initialState: TInitialState = {
  data: [],
  cityList: {},
  status: 'idle',
  error: null,
};

const specializationsSlice = createSlice({
  name: "city",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCityList.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getCityList.fulfilled, (state, action) => {
        const data = action.payload;
        state.data = data;
        state.cityList = data.reduce((acc: Record<string, string>, current) => {
          acc[current.id] = current.name
          return acc
        }, {})
        state.status = 'success';
      })
      .addCase(getCityList.rejected, (state, action) => {
        state.data = [];
        state.cityList = {};
        state.error = action.payload;
        state.status = 'error';
      })
  },
});

export default specializationsSlice.reducer;
