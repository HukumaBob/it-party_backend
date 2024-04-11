import { TLoginResponse, TUser } from "../types/types";

type TServerResponse<T> = {
  success: boolean;
  data: T;
  order: T;
} & T;
export const checkResponse = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : Promise.reject(`Ошибка:${res.status}`);
};

export const registerUser = (
  email: string,
  password: string,
): Promise<TLoginResponse> => {
  return fetch(``, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      token: localStorage.getItem("refreshToken"),
    }),
  })
    .then(checkResponse<TServerResponse<TLoginResponse>>)
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });
};

export const login = (
  email: string,
  password: string,
  checked: boolean,
): Promise<TLoginResponse> => {
  return fetch(``, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      checked: checked,
      token: localStorage.getItem("accesToken"),
    }),
  })
    .then(checkResponse<TServerResponse<TLoginResponse>>)
    .then((data) => {
      if (data?.success) return data;
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
      if (data?.success) return data;
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
      return Promise.reject(data);
    });
};
