import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "../hooks.ts";
import {API} from "../constants.ts";

type TError = { statusCode: number; statusText: string };
type TErrorDetailed = TError & Record<string, string[]>;
type TResponseError = TError | TErrorDetailed | string | null | undefined;
type TStatus = 'idle' | 'loading' | 'success' | 'error';
type TFileData = {
  file: File;
  caption: string;
}
type TEvent = {
  name: string;
  date: string;
  time: string;
  description: string;
  online: boolean;
  offline: boolean;
  // country: number;
  city: number;
  address: string;
  speakers: number[];
  specializations: number[];
  event_admin: number[];
  stream: string;
  record_link: string;
  gallery: number[];
};
type TCreateEventData = Partial<TEvent> & { files: TFileData[] };
type TInitialState = {
  data: TEvent;
  statusCreateEvent: TStatus;
  errorCreateEvent: TResponseError;
};
type TUploadResponse = {
  id: number;
  event_photo: string;
  caption: string;
}

const handleError = async (response: Response, rejectWithValue: Function) => {
  const {status: statusCode, statusText} = response;
  if ([500, 404].includes(statusCode)) {
    return rejectWithValue({statusCode, statusText});
  }
  const errorData = await response.json();
  return rejectWithValue({statusCode, statusText, ...errorData});
};


export const createEvent =
  createAsyncThunk<TEvent, TCreateEventData, { rejectValue: TResponseError; state: RootState }>(
    'post_event',
    async function ({files, ...eventData}, {rejectWithValue, getState}) {
      try {
        const accessToken = getState().authorization.accessToken;

        console.log(accessToken)


        let galleryData: TUploadResponse[] = [];
        // отправка картинок:
        if (files && files.length > 0) {
          const uploadPromises = files.map(async (fileData) => {
            const {file, caption} = fileData;
            const formData = new FormData();
            formData.append('caption', caption);
            formData.append('event_photo', file);
            const uploadResponse = await fetch(API.GALLERY, {
              method: "POST",
              headers: {"Authorization": `Bearer ${accessToken}`},
              body: formData,
            });
            if (!uploadResponse.ok) return await handleError(uploadResponse, rejectWithValue)
            return await uploadResponse.json() as TUploadResponse;
          });

          galleryData = await Promise.all(uploadPromises);
        }

        // отправка дынных со списком картинок:
        const gallery = galleryData.map(({event_photo, caption}) => ({event_photo, caption}));
        const eventBody = {...eventData, gallery};

        const response = await fetch(`${API.EVENT_LIST}/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
          body: JSON.stringify(eventBody),
        });
        if (!response.ok) return await handleError(response, rejectWithValue)
        const event: TEvent = await response.json();
        return event;
      } catch (err) {
        return rejectWithValue(err instanceof Error ? err.message : 'unknown error');
      }
    }
  );


// export const addEventImage =
//   createAsyncThunk<undefined, File, { rejectValue: TResponseError; state: RootState }>(
//     'update_user_avatar',
//     async function (imageFile, {rejectWithValue, getState}) {
//       const accessToken = getState().authorization.accessToken;
//       const formData = new FormData();
//       formData.append("user_photo", imageFile);
//       const response = await fetch(API.EVENT_LIST, {
//         method: "POST",
//         headers: {"authorization": `Bearer ${accessToken}`},
//         body: formData,
//       })
//       if (!response.ok) {
//         const {status: statusCode, statusText} = response;
//         if ([500, 404].includes(statusCode)) {
//           return rejectWithValue({statusCode, statusText});
//         }
//         const errorData = await response.json();
//         return rejectWithValue({statusCode, statusText, ...errorData});
//       }
//       // const data: TUserProfile = await response.json();
//       // return data
//     }
//   );


// export const deleteUserProfile =
//   createAsyncThunk<undefined, undefined, { rejectValue: TResponseError; state: RootState }>(
//     'delete_user_profile',
//     async function (_, {rejectWithValue, getState}) {
//       const accessToken = getState().authorization.accessToken;
//       const response = await fetch(API.DELETE_USER, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           "authorization": `Bearer ${accessToken}`,
//         },
//       })
//       if (!response.ok) {
//         const {status: statusCode, statusText} = response;
//         if ([500, 404].includes(statusCode)) {
//           return rejectWithValue({statusCode, statusText});
//         }
//         const errorData = await response.json();
//         return rejectWithValue({statusCode, statusText, ...errorData});
//       }
//     }
//   );

const initialState: TInitialState = {
  data: {} as TEvent,
  statusCreateEvent: 'idle',
  errorCreateEvent: null
};

const adminEventCreateSlice = createSlice({
  name: "event_create",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createEvent.pending, (state) => {
        state.statusCreateEvent = 'loading';
        state.errorCreateEvent = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusCreateEvent = 'success';
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.statusCreateEvent = 'error';
        state.errorCreateEvent = action.payload;
      })
  },
});

export const {} = adminEventCreateSlice.actions;
export default adminEventCreateSlice.reducer;
