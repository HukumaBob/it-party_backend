import {
  TUserProfileValues,
  TFormDataPersonalValues,
  TFormConfidentialityValues,
  TFormEditAvatar,
} from "../types/types";
import {API} from "./constants";

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

// export const login = (
//   email: string,
//   password: string,
// ): Promise<TLoginResponse> => {
//   return fetch(API.LOGIN, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json;charset=utf-8",
//     },
//     body: JSON.stringify({
//       email: email,
//       password: password,
//     }),
//   })
//     .then(checkResponse<TServerResponse<TLoginResponse>>);
// };

export const postUserProfile = (): Promise<TUserProfileValues> => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return Promise.reject("No accessToken available");
  }

  return fetch(API.USERS_PROFILES, {
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

  return fetch(API.USER_PROFILE, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
    },
  })
    .then(checkResponse<TServerResponse<TUserProfileValues>>);
};

export const deleteUserProfile = (): Promise<Response> => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return Promise.reject("No accessToken available");
  }

  return fetch(API.USER_PROFILE, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
    },
  })
    .then((res) => checkResponseRequest(res));
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
  return fetch(API.USER_PROFILE, {
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
  return fetch(API.USER_PROFILE, {
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
  return fetch(API.USER_PROFILE, {
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

  return fetch(API.USERS_PROFILES, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: `Bearer ${accessToken}`,
    },
  }).then(checkResponse<TServerResponse<TUserProfileValues>>);
};
