import {TUserProfileValues, TFormDataPersonalValues} from "../types/types";
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

// export const editingConfidentiality = (
//   data: TFormConfidentialityValues,
// ): Promise<TUserProfileValues> => {
//   return fetch(API.USER_PROFILE, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json;charset=utf-8",
//       "authorization": `Bearer ${localStorage.getItem("accessToken")}`,
//     },
//     body: JSON.stringify(data),
//   })
//     .then(checkResponse<TServerResponse<TUserProfileValues>>);
// };
