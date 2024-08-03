import {PayloadAction, createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {API} from "../../api/constants";

type TOption = {
  value: number;
  label: string;
}
type TStack = {
  id: number;
  name: string;
  specialization: number;
}
type TSpecialization = {
  id: number;
  specialization: string;
  index: number;
}
type TStackObject = {
  specialization: TSpecialization;
  stacks: TStack[]
}
type TInitialState = {
  data: TStackObject[];
  optionsSpecialization: Record<string, TOption>;
  optionsStack: Record<string, TOption[]>;
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;
}

export const getStackList =
  createAsyncThunk<TStackObject[], undefined, { rejectValue: string }>(
    'fetch_stack_list',
    async function (_, {rejectWithValue}) {
      try {
        const response = await fetch(API.STACK_LIST, {
          method: "GET",
          headers: {"Content-Type": "application/json"},
        })
        if (!response.ok) {
          return rejectWithValue(response.statusText);
        }
        const data: TStackObject[] = await response.json();
        return data
      } catch (err) {
        return rejectWithValue(err instanceof Error ? err.message : 'unknown error');
      }
    }
  );

const initialState: TInitialState = {
  data: [],
  optionsSpecialization: {},
  optionsStack: {},
  status: 'idle',
  error: null,
};

const stackListSlice = createSlice({
  name: "stackList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStackList.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getStackList.fulfilled, (state, action: PayloadAction<TStackObject[]>) => {
        const data = action.payload;
        state.error = null;
        state.status = 'success'
        // data - не используется:
        state.data = action.payload;
        // optionsSpecialization - для селектов в форме:
        state.optionsSpecialization = data.reduce((acc: Record<string, TOption>, current) => {
          const specialization = current.specialization
          acc[specialization.id] = {value: specialization.id, label: specialization.specialization}
          return acc;
        }, {})
        // stacks - для селектов в форме:
        state.optionsStack = data.reduce((acc: Record<string, TOption[]>, current) => {
          acc[current.specialization.id] = current.stacks.map(({id, name}) => ({value: id, label: name}))
          return acc
        }, {})
      })
      .addCase(getStackList.rejected, (state: any, action: PayloadAction<string | undefined>) => {
        state.error = action.payload;
        state.status = 'error';
        state.data = null;
        state.optionsSpecialization = null;
        state.optionsStack = null;
      })
  },
});

export default stackListSlice.reducer;
