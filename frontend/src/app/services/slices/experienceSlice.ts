import {PayloadAction, createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {API} from "../../api/constants";

type TExperience = { id: number; experience: string };
type TOption = { value: number; label: string };
type TInitialState = {
  data: TExperience[];
  optionsExperience: Record<string, TOption>;
  experienceSelectOptions: TOption[];
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;
}

export const getExperienceList =
  createAsyncThunk<TExperience[], undefined, { rejectValue: string }>(
    'fetch_experience_list',
    async function (_, {rejectWithValue}) {
      try {
        const response = await fetch(API.EXPERIENCE_LIST, {
          method: "GET",
          headers: {"Content-Type": "application/json"},
        })
        if (!response.ok) {
          return rejectWithValue(response.statusText);
        }
        const data: TExperience[] = await response.json();
        return data
      } catch (err) {
        return rejectWithValue(err instanceof Error ? err.message : 'unknown error');
      }
    }
  );

const initialState: TInitialState = {
  data: [],
  optionsExperience: {},
  experienceSelectOptions: [],
  status: 'idle',
  error: null,
};

const experienceSlice = createSlice({
  name: "experience",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getExperienceList.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getExperienceList.fulfilled, (state, action: PayloadAction<TExperience[]>) => {
        const data = action.payload
        state.data = data
        state.optionsExperience = data.reduce((acc: Record<string, TOption>, current) => {
          acc[current.id] = {value: current.id, label: current.experience}
          return acc;
        }, {})
        state.experienceSelectOptions = data.map(({id, experience}) => ({value: id, label: experience}))
        state.status = 'success'
      })
      .addCase(getExperienceList.rejected, (state: any, action: PayloadAction<string | undefined>) => {
        state.error = action.payload;
        state.status = 'error';
        state.data = [];
        state.optionsExperience = {};
        state.experienceSelectOptions = [];
      })
  },
});

export default experienceSlice.reducer;
