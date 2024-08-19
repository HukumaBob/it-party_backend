import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {API} from "../constants.ts";
import dayjs from "dayjs";
import {RootState} from "../hooks.ts";
import banner_orange from "../../assets/image/banners/banner_1.webp";
import banner_green from "../../assets/image/banners/banner_2.webp";
import banner_blue from "../../assets/image/banners/banner_3.webp";
import banner_purple from "../../assets/image/banners/banner_4.webp";

type TCubeSlide = {
  date: string;
  title: string;
  city: string;
  image: string;
};
type TEvent = {
  id: number;
  info: string;
  name: string;
  description: string;
  logo: string;
  date: string;
  time: string;
  user_application_status: 'not_applied' | 'pending' | 'approved' | 'rejected' | 'is_favorite';
};
type TInitialState = {
  recommended: TEvent[];
  statusRecommended: 'idle' | 'loading' | 'success' | 'error';
  errorRecommended: string | null;
  popular: TEvent[];
  statusPopular: 'idle' | 'loading' | 'success' | 'error';
  errorPopular: string | null;
  cube: TCubeSlide[],
};
type TResponse = {
  results: TEvent[];
  count: number;
};
type TType = 'recommended' | 'popular';

export const getSliderList =
  createAsyncThunk<TEvent[], TType, { rejectValue: string; state: RootState }>
  ("fetch_slider_list",
    async (type, {rejectWithValue, getState}) => {
      try {
        const search = new URLSearchParams()
        search.append("limit", "10")
        search.append("offset", "0")

        if (type === 'recommended') {
          const date = dayjs().add(6, 'month').format('YYYY-MM-DD')
          search.append("date_after", date)
        }
        if (type === 'popular') {
          const date = dayjs().format('YYYY-MM-DD')
          search.append("date_after", date)
        }

        const accessToken = getState().authorization.accessToken
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        }
        if (accessToken) {
          headers["Authorization"] = `Bearer ${accessToken}`;
        }

        const response = await fetch(`${API.EVENT_LIST}?${search.toString()}`, {
          method: "GET",
          headers: headers
        });
        if (!response.ok) return rejectWithValue(response.statusText);
        const data: TResponse = await response.json();
        return data.results;
      } catch (err) {
        return rejectWithValue(err instanceof Error ? err.message : 'unknown error');
      }
    },
  );

const cubeSlides = [
  {
    date: "20 МАРТА",
    title: "UNION ALL",
    city: "ОНЛАЙН",
    image: banner_orange,
  },
  {
    date: "4 АПРЕЛЯ",
    title: "about:cloud infrastructure",
    city: "МОСКВА",
    image: banner_green,
  },
  {
    date: "24 МАЯ",
    title: "InnoCode Conference",
    city: "ПИТЕР",
    image: banner_blue,
  },
  {
    date: "25 АПРЕЛЯ",
    title: "Cloud Security Meetup",
    city: "МОСКВА",
    image: banner_purple,
  },
];

const initialState: TInitialState = {
  recommended: [],
  statusRecommended: 'idle',
  errorRecommended: null,
  popular: [],
  statusPopular: 'idle',
  errorPopular: null,
  cube: cubeSlides
};

const sliderSlice = createSlice({
  name: "slider",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSliderList.pending, (state, action) => {
        const type = action.meta.arg;
        if (type === 'recommended') {
          state.statusRecommended = 'loading';
          state.errorRecommended = null;
        }
        if (type === 'popular') {
          state.statusPopular = 'loading'
          state.errorPopular = null;
        }
      })
      .addCase(getSliderList.fulfilled, (state, action) => {
        const type = action.meta.arg;
        if (type === 'recommended') {
          state.recommended = action.payload;
          state.statusRecommended = 'success'
        }
        if (type === 'popular') {
          state.popular = action.payload;
          state.statusPopular = 'success'
        }
      })
      .addCase(getSliderList.rejected, (state: any, action) => {
        const type = action.meta.arg;
        if (type === 'recommended') {
          state.errorRecommended = action.payload;
          state.statusRecommended = 'error'
          state.popular = null;
        }
        if (type === 'popular') {
          state.errorPopular = action.payload;
          state.statusPopular = 'error'
          state.popular = null;
        }
      })
  },
});

export default sliderSlice.reducer;
