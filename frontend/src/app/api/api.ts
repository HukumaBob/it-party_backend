import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  TLoginResponse,
  TUser,
  TCard,
  TUserProfileValues,
  TFormDataPersonalValues,
  TFormConfidentialityValues,
  TListCountry,
  TGetMyEvent,
  PostEventPayload,
  PatchEventPayload,
} from "../types/types";
import {
  BASE_URL,
  LOGIN_API_ENDPOINT,
  USERS_API_ENDPOINT,
  USER_PROFILES_API_ENDPOINT,
  USER_PROFILE_GET_AND_PATCH_API_ENDPOINT,
  FETCH_UPDATEURL,
  LIST_COUNTRY_GET_API_ENDPOINT,
  EVENTS_API_ENDPOINT,
  REGISTER_AND_APPLY_API_ENDPOINT,
  USER_EVENT_STATUS_API_ENDPOINT,
  CITIES,
  SPECIALIZATIONS
} from "./constants";

type TServerResponse<T> = {
  success: boolean;
  data: T;
} & T;

export const checkResponse = async <T>(res: Response): Promise<T> => {
  if (res.ok) {
    return res.json();
  } else {
    const errorBody = await res.json();
    const errorMessage = JSON.stringify(errorBody);
    return Promise.reject(
      errorMessage
        .replace(/[{}[\]]/g, "")
        .replace(/"/g, "")
        .split(":")
        .slice(1)
        .join(" "),
    );
  }
};

export const registerUser = (
  email: string,
  password: string,
  agreement_required: boolean,
): Promise<TLoginResponse> => {
  return fetch(`${BASE_URL}${USERS_API_ENDPOINT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      agreement_required: agreement_required,
    }),
  })
    .then(checkResponse<TServerResponse<TLoginResponse>>)
    .then((data) => {
      if (data) return data;
      return Promise.reject(data);
    });
};

export const login = (
  email: string,
  password: string,
): Promise<TLoginResponse> => {
  return fetch(`${BASE_URL}${LOGIN_API_ENDPOINT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then(checkResponse<TServerResponse<TLoginResponse>>)
    .then((data) => {
      if (data) return data;
      return Promise.reject(data);
    });
};

export const logout = (): Promise<TUser> => {
  return fetch(``, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  })
    .then(checkResponse<TServerResponse<TUser>>)
    .then((data) => {
      if (data) return data;
      return Promise.reject(data);
    });
};

export const postUserProfile = (): Promise<TUserProfileValues> => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return Promise.reject("No accessToken available");
  }

  return fetch(`${BASE_URL}${USER_PROFILES_API_ENDPOINT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(checkResponse<TServerResponse<TUserProfileValues>>)
    .then((data) => {
      if (data) return data;
      return Promise.reject(data);
    });
};

export const getUserProfile = (): Promise<TUserProfileValues> => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return Promise.reject("No accessToken available");
  }

  return fetch(`${BASE_URL}${USER_PROFILE_GET_AND_PATCH_API_ENDPOINT}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(checkResponse<TServerResponse<TUserProfileValues>>)
    .then((data) => {
      if (data) return data;
      return Promise.reject(data);
    });
};

export const getListCountry = (): Promise<TListCountry> => {
  return fetch(`${BASE_URL}${LIST_COUNTRY_GET_API_ENDPOINT}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(checkResponse<TServerResponse<TListCountry>>);
};

export const getEventsList = createAsyncThunk(
  "events/getEventsList",
  async (_, thunkAPI) => {
    // @ts-ignore
    const { events: state } = thunkAPI.getState();

    const searchParams = new URLSearchParams(state.filters)
    if (!state.specializationsFilters["0"]) {
      Object
        .values(state.specializationsFilters)
        .forEach(
          id => searchParams.append("specializations", String(id))
        )
    }
    const queryParams = searchParams.toString()
    const searchString = queryParams ? "?" + queryParams : ""

    const EVENTS = EVENTS_API_ENDPOINT + searchString
    const urls = [EVENTS]

    if (!state.cities.length) urls.push(CITIES)
    if (!state.specializations.length) urls.push(SPECIALIZATIONS)

    const endpoints = urls.map(url => BASE_URL + url)

    const promises = endpoints.map(
      url => fetch(url, { method: 'GET', headers: { "Content-Type": "application/json" } })
    )
    // <TServerResponse<Tcard>>
    return Promise.all(promises)
      .then(results => Promise.all(results.map(checkResponse)))
      // @ts-ignore
      .then((data) => {
        if (data) return {
          // @ts-ignore
          cards: data[0]?.results,
          // @ts-ignore
          cities: data[1]?.results,
          // @ts-ignore
          specializations: data[2]?.results
        }
        return Promise.reject(data);
      });
  },
);

// Promise.all([mainApi.getUserInfo(), mainApi.getMovies()])
//   .then(([user, moviesSaved]) => {
//     setCurrentUser(user);
//     localStorage.setItem('userName', user.name);
//     setMoviesSaved(moviesSaved);
//   })
//   .catch((err) => {
//     console.log(err);
//     checkErrorAuthorization(err, pathname);
//   })















export const editingDataPersonal = (
  data: TFormDataPersonalValues,
): Promise<TUserProfileValues> => {
  return fetch(FETCH_UPDATEURL, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify(data),
  }).then(checkResponse<TServerResponse<TUserProfileValues>>);
};

export const editingConfidentiality = (
  data: TFormConfidentialityValues,
): Promise<TUserProfileValues> => {
  return fetch(FETCH_UPDATEURL, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify(data),
  }).then(checkResponse<TServerResponse<TUserProfileValues>>);
};

export const getFormProfile = (): Promise<TUserProfileValues> => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return Promise.reject("No accessToken available");
  }

  return fetch(`${BASE_URL}${USER_PROFILES_API_ENDPOINT}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: `Bearer ${accessToken}`,
    },
  }).then(checkResponse<TServerResponse<TUserProfileValues>>);
};

export const getMyEvents = (): Promise<TGetMyEvent> => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return Promise.reject("Токен не найден");
  }

  return fetch(`${BASE_URL}${EVENTS_API_ENDPOINT}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: `Bearer ${accessToken}`,
    },
  })
    .then(checkResponse<TServerResponse<TGetMyEvent>>)
    .then((data) => data);
};

export const postEvent = createAsyncThunk<TCard, PostEventPayload>(
  "events/postEvent",
  async ({ data, id }, thunkAPI) => {
    const response = await fetch(
      `${BASE_URL}${REGISTER_AND_APPLY_API_ENDPOINT}${id}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(data),
      },
    );
    if (!response.ok) {
      return thunkAPI.rejectWithValue("Failed to post event");
    }
    return (await response.json()) as TCard;
  },
);

export const patchEventStatus = createAsyncThunk<TCard, PatchEventPayload>(
  "events/patchEvent",
  async ({ data, id }, thunkAPI) => {
    try {
      const response = await fetch(
        `${BASE_URL}${USER_EVENT_STATUS_API_ENDPOINT}${id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(data),
        },
      );
      if (!response.ok) {
        return thunkAPI.rejectWithValue("Failed to patch event");
      }
      return (await response.json()) as TCard;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "An error occurred while patching the event",
      );
    }
  },
);