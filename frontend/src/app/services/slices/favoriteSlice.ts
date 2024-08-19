import {PayloadAction, createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "../hooks.ts";
import {API} from "../constants.ts";

type TEvent = {
  id: number;
  info: string;
  name: string;
  description: string;
  logo: string;
  date: string;
  time: string;
  user_application_status: 'not_applied' | 'pending' | 'approved' | 'rejected' | 'is_favorite';
}
export type TInitialState = {
  data: TEvent[];
  loading: boolean;
  error: string | null | undefined;
  favorite: Record<string, boolean>;
  count: number;
  pageNumber: number;
  pageCount: number;
  offset: number;
  limit: number;
};
type TResponse = {
  results: TEvent[];
}

export const getFavoriteList =
  createAsyncThunk<TResponse, undefined, { rejectValue: string; state: RootState }>(
    "fetch_favorite_list",
    async (_, {rejectWithValue, getState}) => {
      const state = getState()
      const favoriteIdList = state.favorite.favorite;
      const accessToken = state.authorization.accessToken

      if (Object.keys(favoriteIdList).length === 0) {
        return {results: []} // если нет favorite - выйти из санки и венуть пустые дынные
      }

      const search = new URLSearchParams()
      Object.keys(favoriteIdList).forEach(eventId => search.append('event_id', String(eventId)));
      search.append('limit', '2000000')
      search.append('offset', '0')

      const response = await fetch(`${API.EVENT_LIST}?${search.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) return rejectWithValue(response.statusText);
      const data: TResponse = await response.json();
      return data
    },
  );

export const initialState: TInitialState = {
  data: [],
  loading: false,
  error: null,
  favorite: {},
  count: 0,
  pageNumber: 1,
  pageCount: 0,
  offset: 0,
  limit: 3,
};

const favoriteSlice = createSlice({
    name: "favorite",
    initialState,
    reducers: {
      handleFavoriteClick: (state, action: PayloadAction<number>) => {
        const id = action.payload;
        if (state.favorite[id]) {
          delete state.favorite[id];
          state.data = state.data.filter(event => event.id !== id);
          const count = state.data.length;
          state.count = count;
          // Пересчитываем общее количество страниц:
          state.pageCount = Math.ceil(count / state.limit);
          // Если на текущей странице больше нет элементов, смещаемся на предыдущую:
          if (state.offset >= count && state.pageNumber > 1) {
            state.pageNumber -= 1;
            state.offset = (state.pageNumber - 1) * state.limit;
          }
        } else {
          state.favorite[id] = true;
        }
      },
      setFavoritePageNumber(state, action: PayloadAction<number>) {
        const pageNumber = action.payload;
        state.pageNumber = pageNumber;
        state.offset = (pageNumber - 1) * state.limit;
      },
      setFavoriteLimit(state, action: PayloadAction<number>) {
        state.limit = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getFavoriteList.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getFavoriteList.fulfilled, (state, action) => {
          const {results} = action.payload;
          const count = results.length;
          state.data = results
          state.count = count;
          state.pageCount = Math.ceil(count / state.limit);
          state.loading = false
          state.error = null;
        })
        .addCase(getFavoriteList.rejected, (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload;
          state.loading = false;
          state.count = 0;
          state.pageCount = 0;
          state.data = [];
        })
    },
  }
);

export const {handleFavoriteClick, setFavoritePageNumber, setFavoriteLimit} = favoriteSlice.actions;
export default favoriteSlice.reducer;
