import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {API} from "../../api/constants";

type TFamilyStatus = { id: number; familystatus: string };
type TOption = { value: number; label: string };
type TInitialState = {
  data: TFamilyStatus[];
  familyStatusSelectOptions: TOption[]
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | undefined | null;
};

export const getFamilyStatusList =
  createAsyncThunk<TFamilyStatus[], undefined, { rejectValue: string }>(
    'fetch_family_status_list',
    async function (_, {rejectWithValue}) {
      try {
        const response = await fetch(API.FAMILY_STATUS_LIST, {
          method: "GET",
          headers: {"Content-Type": "application/json"},
        })
        if (!response.ok) {
          return rejectWithValue(response.statusText);
        }
        const data: TFamilyStatus[] = await response.json();
        return data
      } catch (err) {
        return rejectWithValue(err instanceof Error ? err.message : 'unknown error');
      }
    }
  );

const initialState: TInitialState = {
  data: [],
  familyStatusSelectOptions: [],
  status: 'idle',
  error: null,
};

const familyStatusSlice = createSlice({
  name: "family_status",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFamilyStatusList.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getFamilyStatusList.fulfilled, (state, action) => {
        const data = action.payload;
        state.data = data;
        state.familyStatusSelectOptions = data.map(({id, familystatus}) => ({value: id, label: familystatus}))
        state.status = 'success';
      })
      .addCase(getFamilyStatusList.rejected, (state, action) => {
        state.data = [];
        state.familyStatusSelectOptions = [];
        state.error = action.payload;
        state.status = 'error';
      })
  },
});

export default familyStatusSlice.reducer;
