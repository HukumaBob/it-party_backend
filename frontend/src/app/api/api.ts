import {
  TLoginResponse,
  TUser,
  TUserProfileValues,
  TFormDataPersonalValues,
  TFormConfidentialityValues,
  TListCountry,
  TFormEditAvatar,
  TFormResetPassword,
} from "../types/types";
import {
  BASE_URL,
  LOGIN_API_ENDPOINT,
  USERS_API_ENDPOINT,
  USER_PROFILES_API_ENDPOINT,
  USER_PROFILE_GET_AND_PATCH_API_ENDPOINT,
  FETCH_UPDATEURL,
  LIST_COUNTRY_GET_API_ENDPOINT,
  RESET_PASSWORD_API_ENDPOINT,
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
    .then(checkResponse<TServerResponse<TLoginResponse>>);
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
    .then(checkResponse<TServerResponse<TUserProfileValues>>);
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
      "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
    },
  })
    .then(checkResponse<TServerResponse<TUserProfileValues>>);
};

export const resetPassword = (
  data: TFormResetPassword
): Promise<Response> => {

  return fetch(`${BASE_URL}${RESET_PASSWORD_API_ENDPOINT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      email: data.email,
    }),
  })
    .then((res) => checkResponseRequest(res));
};

export const deleteUserProfile = (): Promise<Response> => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return Promise.reject("No accessToken available");
  }

  return fetch(`${BASE_URL}${USER_PROFILE_GET_AND_PATCH_API_ENDPOINT}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
    },
  })
    .then((res) => checkResponseRequest(res));
};

export const getListCountry = (): Promise<TListCountry> => {
  return fetch(`${BASE_URL}${LIST_COUNTRY_GET_API_ENDPOINT}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(checkResponse<TServerResponse<TListCountry>>);
};

export const checkResponseRequest = (res: Response) => {
  if (res.ok) {
    return res;
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export const editingDataPersonal = (
  data: TFormDataPersonalValues,
): Promise<TUserProfileValues> => {
  return fetch(FETCH_UPDATEURL, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "authorization": `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify(data),
  })
    .then(checkResponse<TServerResponse<TUserProfileValues>>);
};

export const editingAvatar = (
  data: TFormEditAvatar,
): Promise<TUserProfileValues> => {
  const formData = new FormData();
  formData.append("user_photo", data.user_photo[0]);
  return fetch(FETCH_UPDATEURL, {
    method: "PATCH",
    headers: {
      "authorization": `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: formData,
  })
    .then(checkResponse<TServerResponse<TUserProfileValues>>);
};

export const editingConfidentiality = (
  data: TFormConfidentialityValues,
): Promise<TUserProfileValues> => {
  return fetch(FETCH_UPDATEURL, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "authorization": `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify(data),
  })
    .then(checkResponse<TServerResponse<TUserProfileValues>>);
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
