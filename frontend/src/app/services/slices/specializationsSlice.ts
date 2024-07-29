import {PayloadAction, createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {API} from "../../api/constants";

type TSpecialization = {
  id: number;
  specialization: string;
  index: number;
}

type TInitialState = {
  data: TSpecialization[] | null;
  loading: boolean;
  error: string | null;
}

export const getSpecializationsList = createAsyncThunk<TSpecialization[], undefined, { rejectValue: string }>(
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
  loading: false,
  error: null,
};

const specializationsSlice = createSlice({
  name: "specializations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSpecializationsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSpecializationsList.fulfilled, (state, action: PayloadAction<TSpecialization[]>) => {
        state.data = action.payload;
        state.error = null;
        state.loading = false
      })
      .addCase(getSpecializationsList.rejected, (state: any, action: PayloadAction<string | undefined>) => {
        state.error = action.payload;
        state.loading = false;
      })
  },
});

export default specializationsSlice.reducer;
