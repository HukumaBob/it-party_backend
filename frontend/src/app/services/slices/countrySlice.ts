import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {API} from "../constants.ts";

type TCountry = {
  id: number;
  name: string;
  index: number;
  country_code: string;
  input_mask: string;
};
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
        const data = await response.json();
        const addData = [
          {country_code: 'RU', input_mask: '+9 (999) 999-9999'},
          {country_code: 'UA', input_mask: '+999 (99) 999-99-99'},
          {country_code: 'BY', input_mask: '+999 (99) 999-99-99'}
        ]
        type TData = {
          id: number;
          name: string;
          index: number;
        }
        const resultData: TCountry[] = data.map((item: TData, i: number) => ({...item, ...addData[i]}));
        return resultData
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
