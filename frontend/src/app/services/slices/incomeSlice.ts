import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {API} from "../../api/constants";

type TIncome = { id: number; income: string };
type TOption = { value: number; label: string };
type TInitialState = {
  data: TIncome[];
  incomeSelectOptions: TOption[]
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | undefined | null;
};

export const getIncomeList =
  createAsyncThunk<TIncome[], undefined, { rejectValue: string }>(
    'fetch_income_list',
    async function (_, {rejectWithValue}) {
      try {
        const response = await fetch(API.INCOME_LIST, {
          method: "GET",
          headers: {"Content-Type": "application/json"},
        })
        if (!response.ok) {
          return rejectWithValue(response.statusText);
        }
        const data: TIncome[] = await response.json();
        return data
      } catch (err) {
        return rejectWithValue(err instanceof Error ? err.message : 'unknown error');
      }
    }
  );

const initialState: TInitialState = {
  data: [],
  incomeSelectOptions: [],
  status: 'idle',
  error: null,
};

const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIncomeList.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getIncomeList.fulfilled, (state, action) => {
        const data = action.payload;
        state.data = data;
        state.incomeSelectOptions = data.map(({id, income}) => ({value: id, label: income}))
        state.status = 'success';
      })
      .addCase(getIncomeList.rejected, (state, action) => {
        state.data = [];
        state.incomeSelectOptions = [];
        state.error = action.payload;
        state.status = 'error';
      })
  },
});

export default incomeSlice.reducer;
