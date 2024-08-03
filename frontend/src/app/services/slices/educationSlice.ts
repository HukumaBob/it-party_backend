import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {API} from "../../api/constants";

type TEducation = { id: number; education: string };
type TOption = { value: number; label: string };
type TInitialState = {
  data: TEducation[];
  educationSelectOptions: TOption[]
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | undefined | null;
};

export const getEducationList =
  createAsyncThunk<TEducation[], undefined, { rejectValue: string }>(
    'fetch_education_list',
    async function (_, {rejectWithValue}) {
      try {
        const response = await fetch(API.EDUCATION_LIST, {
          method: "GET",
          headers: {"Content-Type": "application/json"},
        })
        if (!response.ok) {
          return rejectWithValue(response.statusText);
        }
        const data: TEducation[] = await response.json();
        return data
      } catch (err) {
        return rejectWithValue(err instanceof Error ? err.message : 'unknown error');
      }
    }
  );

const initialState: TInitialState = {
  data: [],
  educationSelectOptions: [],
  status: 'idle',
  error: null,
};

const educationSlice = createSlice({
  name: "education",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEducationList.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getEducationList.fulfilled, (state, action) => {
        const data = action.payload;
        state.data = data;
        state.educationSelectOptions = data.map(({id, education}) => ({value: id, label: education}))
        state.status = 'success';
      })
      .addCase(getEducationList.rejected, (state, action) => {
        state.data = [];
        state.educationSelectOptions = [];
        state.error = action.payload;
        state.status = 'error';
      })
  },
});

export default educationSlice.reducer;
