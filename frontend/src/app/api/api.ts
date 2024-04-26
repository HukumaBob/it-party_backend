import { createAsyncThunk } from "@reduxjs/toolkit";
import { TLoginResponse, 
         TUser,
         TCard,
         TUserProfileValues,
         TFormDataPersonalValues,
         TFormCareerAndEducationValues,
         TFormAboutMeValues,
         TFormConfidentialityValues,
         TFormProfileAvatar } from "../types/types";
import { BASE_URL, LOGIN_API_ENDPOINT, USERS_API_ENDPOINT, USER_PROFILES_API_ENDPOINT, FETCH_UPDATEURL, FETCH_METHOD_AND_HEADERS } from "./constants";

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

export const getUserProfile = (): Promise<TUser> => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return Promise.reject("No accessToken available");
  }

  return fetch(``, {
    method: "GET",
    headers: {
      Authorization: accessToken,
    },
  })
    .then(checkResponse<TServerResponse<TUser>>)
    .then((data) => {
      if (data?.success) {
        return data;
      }
      console.log(data);
      return Promise.reject(data);
    });
};

export const getEvents = createAsyncThunk("asyncIngredient", async () => {
  const response = await fetch(`/api/v1/events/`);
  const data = await checkResponse<TServerResponse<TCard[]>>(response);
  return data.data;
});


export const editingDataPersonal = (data: TFormDataPersonalValues): Promise<TUserProfileValues> => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return Promise.reject("No accessToken available");
  }

  return fetch(FETCH_UPDATEURL, {...FETCH_METHOD_AND_HEADERS,  body: JSON.stringify(data)})
    .then(checkResponse<TServerResponse<TUserProfileValues>>)
}

export const editingProfileAvatar = (data: TFormProfileAvatar): Promise<TUserProfileValues> => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return Promise.reject("No accessToken available");
  }

  return fetch(FETCH_UPDATEURL, {...FETCH_METHOD_AND_HEADERS,  body: JSON.stringify(data)})
    .then(checkResponse<TServerResponse<TUserProfileValues>>)
}


export const editingCareerAndEducation = (data: TFormCareerAndEducationValues ): Promise<TUserProfileValues> => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return Promise.reject("No accessToken available");
  }

  return fetch(FETCH_UPDATEURL, {...FETCH_METHOD_AND_HEADERS,  body: JSON.stringify(data)})
    .then(checkResponse<TServerResponse<TUserProfileValues>>)
}

export const editingAboutMe = (data: TFormAboutMeValues ): Promise<TUserProfileValues> => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return Promise.reject("No accessToken available");
  }

  return fetch(FETCH_UPDATEURL, {...FETCH_METHOD_AND_HEADERS,  body: JSON.stringify(data)})
    .then(checkResponse<TServerResponse<TUserProfileValues>>)
}

export const editingConfidentiality = (data: TFormConfidentialityValues): Promise<TUserProfileValues> => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return Promise.reject("No accessToken available");
  }
  
  return fetch(FETCH_UPDATEURL, {...FETCH_METHOD_AND_HEADERS,  body: JSON.stringify(data)})
    .then(checkResponse<TServerResponse<TUserProfileValues>>)
}

export const getFormProfile = (): Promise<TUserProfileValues> => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return Promise.reject("No accessToken available");
  }

  return fetch(`${BASE_URL}${USER_PROFILES_API_ENDPOINT}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "authorization": `Bearer ${accessToken}`,
    },
  })
  .then(checkResponse<TServerResponse<TUserProfileValues>>)
};