import {PayloadAction, createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {BASE_URL, EVENTS_API_ENDPOINT} from "../../api/constants";

type TEvent = {
  id: number;
  info: string;
  name: string;
  description: string;
  logo: string;
  date: string;
  time: string;
  user_application_status: 'not_applied' | 'pending' | 'approved' | 'rejected';
}

type TInitialState = {
  data: TEvent[];
  loading: boolean;
  error: string | null;
  favorite: Record<string, boolean>;
};

type TResponse = {
  results: TEvent[];
}

export const getFavoriteList = createAsyncThunk<TResponse, undefined, {
  rejectValue: string;
  state: { favorite: TInitialState }
}>(
  "fetch_favorite_list",
  async (_, {rejectWithValue, getState}) => {
    const favoriteIdList = getState().favorite.favorite;

    if (Object.keys(favoriteIdList).length === 0) {
      // если нет favorite - выйти из санки и венуть пустые дынные в fulfilled
      // иначе api вернет все ивенты
      return {results: []}
    }

    const search = new URLSearchParams()
    Object.keys(favoriteIdList).forEach(eventId => search.append('event_id', String(eventId)));
    search.append('limit', '2000000')
    search.append('offset', '0')

    const response = await fetch(`${BASE_URL}${EVENTS_API_ENDPOINT}?${search.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    if (!response.ok) return rejectWithValue(response.statusText);
    const data: TResponse = await response.json();
    return data
  },
);

const initialState: TInitialState = {
  data: [],
  loading: true,
  error: null,
  favorite: {}
};

const favoriteSlice = createSlice({
    name: "favorite",
    initialState,
    reducers: {
      handleFavoriteClick: (state, action: PayloadAction<number>) => {
        const id = action.payload;
        if (state.favorite[id]) {
          delete state.favorite[id];
        } else {
          state.favorite[id] = true;
        }
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
          state.data = results
          state.loading = false
          state.error = null;
        })
        .addCase(getFavoriteList.rejected, (state: any, action: PayloadAction<string | undefined>) => {
          state.error = action.payload;
          state.loading = false;
          state.data = []
        })
    },
  }
);

export const {handleFavoriteClick} = favoriteSlice.actions;
export default favoriteSlice.reducer;
