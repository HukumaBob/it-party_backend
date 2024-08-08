import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {API} from "../constants.ts";

type TCountry = { id: number; name: string; index: number };
type TOption = { value: number; label: string };
type TInitialState = {
  data: TCountry[];
  countrySelectOptions: TOption[]
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | undefined | null;
};

export const getCountryList =
  createAsyncThunk<TCountry[], undefined, { rejectValue: string }>(
    'fetch_country_list',
    async function (_, {rejectWithValue}) {
      try {
        const response = await fetch(API.COUNTRY_LIST, {
          method: "GET",
          headers: {"Content-Type": "application/json"},
        })
        if (!response.ok) {
          return rejectWithValue(response.statusText);
        }
        const data: TCountry[] = await response.json();
        return data
      } catch (err) {
        return rejectWithValue(err instanceof Error ? err.message : 'unknown error');
      }
    }
  );

const initialState: TInitialState = {
  data: [],
  countrySelectOptions: [],
  status: 'idle',
  error: null,
};

const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCountryList.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getCountryList.fulfilled, (state, action) => {
        const data = action.payload;
        state.data = data;
        state.countrySelectOptions = data.map(({id, name}) => ({value: id, label: name}))
        state.status = 'success';
      })
      .addCase(getCountryList.rejected, (state, action) => {
        state.data = [];
        state.countrySelectOptions = [];
        state.error = action.payload;
        state.status = 'error';
      })
  },
});

export default countrySlice.reducer;
