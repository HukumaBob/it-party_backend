import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "../hooks.ts";
import {API} from "../constants.ts";

type TError = { statusCode: number; statusText: string };
type TErrorDetailed = TError & Record<string, string[]>;
type TResponseError = TError | TErrorDetailed | string | null | undefined;
type TStatus = 'idle' | 'loading' | 'success' | 'error';
type TEvent = {
  id: number;
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
  gallery: { id: number; event_photo: string; caption: string }[];
  logo: string;
};
type TSelectedFiles = {
  files: { file: File; fileName: string; url: string; caption: string, isServerAsset: boolean, id?: number }[];
  logoIndex: number;
};
type TEventData = {
  type: 'create' | 'update';
  files: TSelectedFiles;
  eventData: Partial<TEvent>;
  eventId?: string;
};
type TInitialState = {
  data: TEvent;
  statusCreateEvent: TStatus;
  errorCreateEvent: TResponseError;
  statusUpdateEvent: TStatus;
  errorUpdateEvent: TResponseError;
  statusGetEvent: TStatus;
  errorGetEvent: TResponseError;
  deleteGalleryImageLoading: boolean;
  deleteGalleryImageError: TResponseError;
};
type TUploadResponse = {
  id: number;
  event_photo: string;
  caption: string;
};

const handleError = async (response: Response, rejectWithValue: Function) => {
  const {status: statusCode, statusText} = response;
  if ([500, 404].includes(statusCode)) {
    return rejectWithValue({statusCode, statusText});
  }
  const errorData = await response.json();
  return rejectWithValue({statusCode, statusText, ...errorData});
};

export const adminEditEvent =
  createAsyncThunk<TEvent, TEventData, { rejectValue: TResponseError; state: RootState }>(
    'admin_edit_event',
    async function (requestData, {rejectWithValue, getState}) {
      // создание нового ивента или обновление ивента
      try {
        const accessToken = getState().authorization.accessToken;
        const {type, files: {logoIndex, files}, eventData, eventId} = requestData;

        // отправка картинок:
        const uploadPromises = files.map(async ({file, caption, url, isServerAsset}) => {
          if (isServerAsset) {
            // если картинки уже загружены - сразу возвращаем их
            // это необходимо для корректного вычисления logo ниже !!!
            return {event_photo: url, caption};
          }

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
        const galleryData: TUploadResponse[] = await Promise.all(uploadPromises);

        // отправка дынных со списком картинок:
        const gallery = galleryData.map(({event_photo, caption}) => ({event_photo, caption}));
        // поскольку Promise.all - возвращает массив данных в том же порядке - находим лого по индексу:
        const logo = gallery[Number(logoIndex)].event_photo
        const eventBody = {...eventData, gallery, logo};
        const URL = type === 'create' ? `${API.EVENT_LIST}/` : `${API.EVENT_LIST}/${eventId}/`;
        const METHOD = type === 'create' ? "POST" : "PATCH";
        const response = await fetch(URL, {
          method: METHOD,
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

export const getAdminEventData =
  createAsyncThunk<TEvent, string, { rejectValue: TResponseError; state: RootState }>(
    'get_admin_event_data',
    async function (eventId, {rejectWithValue, getState}) {
      try {
        const accessToken = getState().authorization.accessToken;
        const response = await fetch(`${API.EVENT_LIST}/${eventId}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) return await handleError(response, rejectWithValue)
        const event: TEvent = await response.json();
        return event;
      } catch (err) {
        return rejectWithValue(err instanceof Error ? err.message : 'unknown error');
      }
    }
  );

export const deleteGalleryImage =
  createAsyncThunk<undefined, number, { rejectValue: TResponseError; state: RootState }>(
    'delete_gallery_image',
    async function (id, {rejectWithValue, getState}) {
      try {
        const accessToken = getState().authorization.accessToken;
        const response = await fetch(`${API.GALLERY}/${id}/`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) return await handleError(response, rejectWithValue)
        // const event: TEvent = await response.json();
        // return event;
      } catch (err) {
        return rejectWithValue(err instanceof Error ? err.message : 'unknown error');
      }
    }
  );

const initialState: TInitialState = {
  data: {} as TEvent,
  statusCreateEvent: 'idle',
  errorCreateEvent: null,
  statusUpdateEvent: 'idle',
  errorUpdateEvent: null,
  statusGetEvent: 'idle',
  errorGetEvent: null,
  deleteGalleryImageLoading: false,
  deleteGalleryImageError: null
};

const adminEditEventSlice = createSlice({
  name: "event_create",
  initialState,
  reducers: {
    resetAdminEventPage(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminEditEvent.pending, (state, action) => {
        const type = action.meta.arg.type;
        if (type === 'create') {
          state.statusCreateEvent = 'loading';
          state.errorCreateEvent = null;
        }
        if (type === 'update') {
          state.statusUpdateEvent = 'loading';
          state.errorUpdateEvent = null;
        }
      })
      .addCase(adminEditEvent.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusCreateEvent = 'success';
        const type = action.meta.arg.type;
        if (type === 'create') {
          state.statusCreateEvent = 'success';
        }
        if (type === 'update') {
          state.statusUpdateEvent = 'success';
        }
      })
      .addCase(adminEditEvent.rejected, (state, action) => {
        const type = action.meta.arg.type;
        if (type === 'create') {
          state.statusCreateEvent = 'error';
          state.errorCreateEvent = action.payload;
        }
        if (type === 'update') {
          state.statusUpdateEvent = 'error';
          state.errorUpdateEvent = action.payload;
        }
      })

      .addCase(getAdminEventData.pending, (state) => {
        state.statusGetEvent = 'loading';
        state.errorGetEvent = null;
      })
      .addCase(getAdminEventData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusGetEvent = 'success';
      })
      .addCase(getAdminEventData.rejected, (state, action) => {
        state.statusGetEvent = 'error';
        state.errorGetEvent = action.payload;
      })

      .addCase(deleteGalleryImage.pending, (state) => {
        state.deleteGalleryImageLoading = true;
        state.deleteGalleryImageError = null;
      })
      .addCase(deleteGalleryImage.fulfilled, (state) => {
        state.deleteGalleryImageLoading = false;
      })
      .addCase(deleteGalleryImage.rejected, (state, action) => {
        state.deleteGalleryImageLoading = false;
        state.deleteGalleryImageError = action.payload;
      })
  },
});

export const {resetAdminEventPage} = adminEditEventSlice.actions;
export default adminEditEventSlice.reducer;
