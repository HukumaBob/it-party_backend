import {PayloadAction, createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {API} from "../constants.ts";

type TSpecialization = { id: number; specialization: string; index: number };
type TOption = { value: number; label: string };
type TInitialState = {
  data: TSpecialization[] | null;
  specializationsSelectOptions: TOption[];
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;
};

export const getSpecializationsList =
  createAsyncThunk<TSpecialization[], undefined, { rejectValue: string }>(
    'fetch_specialization_list',
    async function (_, {rejectWithValue}) {
      try {
        const response = await fetch(API.SPECIALIZATION_LIST, {
          method: "GET",
          headers: {"Content-Type": "application/json"},
        })
        if (!response.ok) {
          return rejectWithValue(response.statusText);
        }
        const data: TSpecialization[] = await response.json();
        return data
      } catch (err) {
        return rejectWithValue(err instanceof Error ? err.message : 'unknown error');
      }
    }
  );

const initialState: TInitialState = {
  data: null,
  specializationsSelectOptions: [],
  status: 'idle',
  error: null,
};

const specializationsSlice = createSlice({
  name: "specializations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSpecializationsList.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getSpecializationsList.fulfilled, (state, action: PayloadAction<TSpecialization[]>) => {
        const data = action.payload;
        state.data = data;
        state.specializationsSelectOptions = data.map(({id, specialization}) => ({value: id, label: specialization}))
        state.status = 'success';
        state.status = 'success';
      })
      .addCase(getSpecializationsList.rejected, (state: any, action: PayloadAction<string | undefined>) => {
        state.error = action.payload;
        state.status = 'error';
      })
  },
});

export default specializationsSlice.reducer;
