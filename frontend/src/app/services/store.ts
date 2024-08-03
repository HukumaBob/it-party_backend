import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from "./rootReducer";
import storage from 'redux-persist/lib/storage'
import {
  persistStore,
  persistReducer,
  createTransform,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import {RootState} from "../../main.tsx";

type TFavorite = {
  favorite: Record<string, any>;
};
type TAuthorization = {
  refreshToken: string;
  accessToken: string;
  isAuthorized: boolean
};

const favoriteTransform = createTransform<TFavorite, TFavorite>(
  (inboundState) => ({favorite: inboundState.favorite}),
  (outboundState) => ({...outboundState, loading: false, error: null, data: []}),
  {whitelist: ['favorite']}
);

const authorizationTransform = createTransform<TAuthorization, TAuthorization>(
  (inboundState) => ({
    refreshToken: inboundState.refreshToken,
    accessToken: inboundState.accessToken,
    isAuthorized: inboundState.isAuthorized
  }),
  (outboundState) => ({
    ...outboundState,
    modalIsOpen: false,
    modalAuthorizationSuccessIsOpen: false,
    formType: 'login',
    statusLogin: 'idle',
    errorLogin: null,
    statusCreate: 'idle',
    errorCreate: null,
    formError: null,
    userEmail: null,
  }),
  {whitelist: ['refreshToken', 'accessToken', 'isAuthorized']}
);

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['favorite', 'authorization'],
  transforms: [favoriteTransform, authorizationTransform],
};

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
